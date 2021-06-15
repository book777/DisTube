import { Readable } from "stream";
import { EventEmitter } from "events";
import { DisTubeVoiceManager } from "./DisTubeVoiceManager";
import { DisTubeError, createDiscordJSAdapter } from "../..";
import { Snowflake, StageChannel, VoiceChannel } from "discord.js";
import { AudioPlayer, AudioPlayerStatus, AudioResource, VoiceConnection, VoiceConnectionState, VoiceConnectionStatus, createAudioPlayer, createAudioResource, entersState, joinVoiceChannel, VoiceConnectionDisconnectReason } from "@discordjs/voice";

export declare interface DisTubeVoice {
  id: Snowflake;
  voiceManager: DisTubeVoiceManager;
  audioPlayer: AudioPlayer;
  connection: VoiceConnection;
  audioResource?: AudioResource;
  on(event: "disconnect" | "error", listener: (error: Error) => void): this;
  on(event: "finish", listener: () => void): this;
}
/**
 * Create a voice connection to the voice channel
 */
export class DisTubeVoice extends EventEmitter {
  private _channel!: VoiceChannel | StageChannel;
  private _volume: number;
  constructor(voiceManager: DisTubeVoiceManager, channel: VoiceChannel | StageChannel) {
    super();
    this.id = channel.guild.id;
    this.voiceManager = voiceManager;
    this._volume = 0.5;
    this.audioPlayer = createAudioPlayer().on("stateChange", (oldState, newState) => {
      if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Idle) {
        delete this.audioResource;
        this.emit("finish");
      }
    }).on("error", error => { this.emit("error", error) });
    this.channel = channel;
    this.connection.on("stateChange", (_, newState: VoiceConnectionState) => {
      if (newState.status === VoiceConnectionStatus.Disconnected) {
        if (
          newState.reason === VoiceConnectionDisconnectReason.WebSocketClose &&
          newState.closeCode === 4014
        ) {
          entersState(this.connection, VoiceConnectionStatus.Connecting, 15e3)
            .catch(() => this.leave());
        } else if (this.connection.reconnectAttempts < 3) {
          setTimeout(() => {
            this.connection.reconnect();
          }, (this.connection.reconnectAttempts + 1) * 5e3).unref();
        } else {
          this.emit("disconnect", new DisTubeError("Cannot reconnect to the voice channel in 15s.", "ConnectionError"));
          this.leave();
        }
      } else if (newState.status === VoiceConnectionStatus.Destroyed) this.stop();
    }).on("error", error => {
      if (this.connection.state.status === VoiceConnectionStatus.Destroyed) return;
      if (this.connection.state.status === VoiceConnectionStatus.Disconnected) {
        this.connection.reconnect();
        entersState(this.connection, VoiceConnectionStatus.Ready, 30e3).catch(() => {
          if (this.connection.state.status === VoiceConnectionStatus.Destroyed) return;
          this.emit("disconnect", error);
          this.leave();
        });
      }
    });
    this.connection.subscribe(this.audioPlayer);
    /**
     * Get or set the volume percentage
     * @name DisTubeVoice#volume
     * @param {number} volume Volume percentage
     */
  }
  get channel() {
    return this._channel;
  }
  set channel(channel: VoiceChannel | StageChannel) {
    this.connection = this._join(channel);
    this._channel = channel;
  }
  private _join(channel: VoiceChannel | StageChannel) {
    return joinVoiceChannel({
      channelId: channel.id,
      guildId: this.id,
      adapterCreator: channel.guild.voiceAdapterCreator || createDiscordJSAdapter(channel),
    });
  }
  /**
   * Join a voice channel with this connection
   * @param {Discord.VoiceChannel|Discord.StageChannel} [channel] A voice channel
   * @private
   * @returns {Promise<DisTubeVoice>}
   */
  async join(channel?: VoiceChannel | StageChannel): Promise<DisTubeVoice> {
    if (channel) this.channel = channel;
    try {
      await entersState(this.connection, VoiceConnectionStatus.Ready, 30e3);
    } catch {
      if (this.connection.state.status !== VoiceConnectionStatus.Destroyed) this.connection.destroy();
      throw new DisTubeError("DisTube cannot connect to the voice channel after 30 seconds.");
    }
    this.voiceManager.collection.set(this.id, this);
    return this;
  }
  /**
   * Leave the voice channel of this connection
   */
  leave() {
    if (this.connection.state.status !== VoiceConnectionStatus.Destroyed) this.connection.destroy();
    this.voiceManager.collection.delete(this.id);
  }
  /**
   * Stop the playing stream
   * @private
   */
  stop() {
    this.audioPlayer.stop();
  }
  /**
   * Play a readable stream
   * @private
   * @param {Readable} stream Readable stream
   */
  play(stream: Readable) {
    this.audioResource = createAudioResource(stream, { inlineVolume: true });
    // eslint-disable-next-line no-self-assign
    this.volume = this.volume;
    this.audioPlayer.play(this.audioResource);
  }
  set volume(volume: number) {
    if (typeof volume !== "number") throw new TypeError("Volume must be a number");
    if (!(volume >= 0)) throw new RangeError("Volume must be >= 0"); // < 0 && NaN
    this._volume = volume / 100;
    this.audioResource?.volume?.setVolume(Math.pow(this._volume, 0.5 / Math.log10(2)));
  }
  get volume() {
    return this._volume * 100;
  }
  /**
   * Playback duration of the audio resource in seconds
   * @type {number}
   */
  get playbackDuration() {
    return (this.audioResource?.playbackDuration || 0) / 1000;
  }
  pause() {
    this.audioPlayer.pause();
  }
  unpause() {
    this.audioPlayer.unpause();
  }
}

export default DisTubeVoice;