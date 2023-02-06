import type { Client, GuildTextBasedChannel } from "discord.js";

import type DisTube from "../DisTube";
import type { DisTubeEvents } from "../type";
import type { DisTubeHandler } from "./DisTubeHandler";
import type { Options } from "./DisTubeOptions";
import type { DisTubeVoiceManager } from "./manager/DisTubeVoiceManager";
import type { QueueManager } from "./manager/QueueManager";

/**
 * @private
 * @abstract
 */
export abstract class DisTubeBase {
  distube: DisTube;
  constructor(distube: DisTube) {
    /**
     * DisTube
     * @type {DisTube}
     */
    this.distube = distube;
  }
  /**
   * Emit the {@link DisTube} of this base
   * @param {string} eventName Event name
   * @param {...any} args arguments
   * @returns {boolean}
   */
  emit(eventName: keyof DisTubeEvents, ...args: any): boolean {
    return this.distube.emit(eventName, ...args);
  }
  /**
   * Emit error event
   * @param {Error} error error
   * @param {Discord.BaseGuildTextChannel} [channel] Text channel where the error is encountered.
   */
  emitError(error: Error, channel?: GuildTextBasedChannel) {
    this.distube.emitError(error, channel);
  }
  /**
   * The queue manager
   * @type {QueueManager}
   * @readonly
   */
  get queues(): QueueManager {
    return this.distube.queues;
  }
  /**
   * The voice manager
   * @type {DisTubeVoiceManager}
   * @readonly
   */
  get voices(): DisTubeVoiceManager {
    return this.distube.voices;
  }
  /**
   * Discord.js client
   * @type {Discord.Client}
   * @readonly
   */
  get client(): Client {
    return this.distube.client;
  }
  /**
   * DisTube options
   * @type {DisTubeOptions}
   * @readonly
   */
  get options(): Options {
    return this.distube.options;
  }
  /**
   * DisTube handler
   * @type {DisTubeHandler}
   * @readonly
   */
  get handler(): DisTubeHandler {
    return this.distube.handler;
  }
}
