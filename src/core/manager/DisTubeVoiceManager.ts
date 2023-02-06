import { getVoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import type { VoiceBasedChannel } from "discord.js";

import type { GuildIdResolvable } from "../../type";
import { resolveGuildId } from "../../util";
import { DisTubeVoice } from "../DisTubeVoice";
import { GuildIdManager } from "./GuildIdManager";

/**
 * Manages voice connections for {@link DisTube}
 * @extends BaseManager
 */
export class DisTubeVoiceManager extends GuildIdManager<DisTubeVoice> {
  /**
   * Get a {@link DisTubeVoice}.
   * @method get
   * @memberof DisTubeVoiceManager#
   * @param {GuildIdResolvable} guild The queue resolvable to resolve
   * @returns {DisTubeVoice?}
   */
  /**
   * Collection of {@link DisTubeVoice}.
   * @name DisTubeVoiceManager#collection
   * @type {Discord.Collection<string, DisTubeVoice>}
   */
  /**
   * Create a {@link DisTubeVoice}
   * @param {Discord.BaseGuildVoiceChannel} channel A voice channel to join
   * @returns {DisTubeVoice}
   * @private
   */
  create(channel: VoiceBasedChannel): DisTubeVoice {
    const existing = this.get(channel.guildId);
    if (existing) {
      existing.channel = channel;
      return existing;
    }
    return new DisTubeVoice(this, channel);
  }
  /**
   * Join a voice channel
   * @param {Discord.BaseGuildVoiceChannel} channel A voice channel to join
   * @returns {Promise<DisTubeVoice>}
   */
  join(channel: VoiceBasedChannel): Promise<DisTubeVoice> {
    const existing = this.get(channel.guildId);
    if (existing) return existing.join(channel);
    return this.create(channel).join();
  }
  /**
   * Leave the connected voice channel in a guild
   * @param {GuildIdResolvable} guild Queue Resolvable
   */
  leave(guild: GuildIdResolvable) {
    const voice = this.get(guild);
    if (voice) {
      voice.leave();
    } else {
      const connection =
        getVoiceConnection(resolveGuildId(guild), this.client.user?.id) ?? getVoiceConnection(resolveGuildId(guild));
      if (connection && connection.state.status !== VoiceConnectionStatus.Destroyed) {
        connection.destroy();
      }
    }
  }
}
