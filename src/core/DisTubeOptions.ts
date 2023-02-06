import type ytdl from "@distube/ytdl-core";

import { defaultOptions } from "../constant";
import type { CustomPlugin } from "../struct/CustomPlugin";
import { DisTubeError } from "../struct/DisTubeError";
import type { ExtractorPlugin } from "../struct/ExtractorPlugin";
import type { Filters } from "../type";
import { DisTubeOptions, StreamType } from "../type";
import { checkInvalidKey } from "../util";

export class Options {
  plugins: (CustomPlugin | ExtractorPlugin)[];
  emitNewSongOnly: boolean;
  leaveOnFinish: boolean;
  leaveOnStop: boolean;
  leaveOnEmpty: boolean;
  emptyCooldown: number;
  savePreviousSongs: boolean;
  searchSongs: number;
  searchCooldown: number;
  youtubeCookie?: string;
  youtubeIdentityToken?: string;
  customFilters?: Filters;
  ytdlOptions: ytdl.getInfoOptions;
  nsfw: boolean;
  emitAddSongWhenCreatingQueue: boolean;
  emitAddListWhenCreatingQueue: boolean;
  joinNewVoiceChannel: boolean;
  streamType: StreamType;
  directLink: boolean;
  constructor(options: DisTubeOptions) {
    if (typeof options !== "object" || Array.isArray(options)) {
      throw new DisTubeError("INVALID_TYPE", "object", options, "DisTubeOptions");
    }
    const opts = { ...defaultOptions, ...options };
    this.plugins = opts.plugins;
    this.emitNewSongOnly = opts.emitNewSongOnly;
    this.leaveOnEmpty = opts.leaveOnEmpty;
    this.leaveOnFinish = opts.leaveOnFinish;
    this.leaveOnStop = opts.leaveOnStop;
    this.savePreviousSongs = opts.savePreviousSongs;
    this.searchSongs = opts.searchSongs;
    this.youtubeCookie = opts.youtubeCookie;
    this.youtubeIdentityToken = opts.youtubeIdentityToken;
    this.customFilters = opts.customFilters;
    this.ytdlOptions = opts.ytdlOptions;
    this.searchCooldown = opts.searchCooldown;
    this.emptyCooldown = opts.emptyCooldown;
    this.nsfw = opts.nsfw;
    this.emitAddSongWhenCreatingQueue = opts.emitAddSongWhenCreatingQueue;
    this.emitAddListWhenCreatingQueue = opts.emitAddListWhenCreatingQueue;
    this.joinNewVoiceChannel = opts.joinNewVoiceChannel;
    this.streamType = opts.streamType;
    this.directLink = opts.directLink;
    checkInvalidKey(opts, this, "DisTubeOptions");
    this.#validateOptions();
  }

  #validateOptions(options = this) {
    if (typeof options.emitNewSongOnly !== "boolean") {
      throw new DisTubeError("INVALID_TYPE", "boolean", options.emitNewSongOnly, "DisTubeOptions.emitNewSongOnly");
    }
    if (typeof options.leaveOnEmpty !== "boolean") {
      throw new DisTubeError("INVALID_TYPE", "boolean", options.leaveOnEmpty, "DisTubeOptions.leaveOnEmpty");
    }
    if (typeof options.leaveOnFinish !== "boolean") {
      throw new DisTubeError("INVALID_TYPE", "boolean", options.leaveOnFinish, "DisTubeOptions.leaveOnFinish");
    }
    if (typeof options.leaveOnStop !== "boolean") {
      throw new DisTubeError("INVALID_TYPE", "boolean", options.leaveOnStop, "DisTubeOptions.leaveOnStop");
    }
    if (typeof options.savePreviousSongs !== "boolean") {
      throw new DisTubeError("INVALID_TYPE", "boolean", options.savePreviousSongs, "DisTubeOptions.savePreviousSongs");
    }
    if (typeof options.joinNewVoiceChannel !== "boolean") {
      throw new DisTubeError(
        "INVALID_TYPE",
        "boolean",
        options.joinNewVoiceChannel,
        "DisTubeOptions.joinNewVoiceChannel"
      );
    }
    if (typeof options.youtubeCookie !== "undefined" && typeof options.youtubeCookie !== "string") {
      throw new DisTubeError("INVALID_TYPE", "string", options.youtubeCookie, "DisTubeOptions.youtubeCookie");
    }
    if (typeof options.youtubeIdentityToken !== "undefined" && typeof options.youtubeIdentityToken !== "string") {
      throw new DisTubeError(
        "INVALID_TYPE",
        "string",
        options.youtubeIdentityToken,
        "DisTubeOptions.youtubeIdentityToken"
      );
    }
    if (
      (typeof options.customFilters !== "undefined" && typeof options.customFilters !== "object") ||
      Array.isArray(options.customFilters)
    ) {
      throw new DisTubeError("INVALID_TYPE", "object", options.customFilters, "DisTubeOptions.customFilters");
    }
    if (typeof options.ytdlOptions !== "object" || Array.isArray(options.ytdlOptions)) {
      throw new DisTubeError("INVALID_TYPE", "object", options.ytdlOptions, "DisTubeOptions.ytdlOptions");
    }
    if (typeof options.searchCooldown !== "number" || isNaN(options.searchCooldown)) {
      throw new DisTubeError("INVALID_TYPE", "number", options.searchCooldown, "DisTubeOptions.searchCooldown");
    }
    if (typeof options.emptyCooldown !== "number" || isNaN(options.emptyCooldown)) {
      throw new DisTubeError("INVALID_TYPE", "number", options.emptyCooldown, "DisTubeOptions.emptyCooldown");
    }
    if (typeof options.searchSongs !== "number" || isNaN(options.searchSongs)) {
      throw new DisTubeError("INVALID_TYPE", "number", options.searchSongs, "DisTubeOptions.searchSongs");
    }
    if (!Array.isArray(options.plugins)) {
      throw new DisTubeError("INVALID_TYPE", "Array<Plugin>", options.plugins, "DisTubeOptions.plugins");
    }
    if (typeof options.nsfw !== "boolean") {
      throw new DisTubeError("INVALID_TYPE", "boolean", options.nsfw, "DisTubeOptions.nsfw");
    }
    if (typeof options.emitAddSongWhenCreatingQueue !== "boolean") {
      throw new DisTubeError(
        "INVALID_TYPE",
        "boolean",
        options.emitAddSongWhenCreatingQueue,
        "DisTubeOptions.emitAddSongWhenCreatingQueue"
      );
    }
    if (typeof options.emitAddListWhenCreatingQueue !== "boolean") {
      throw new DisTubeError(
        "INVALID_TYPE",
        "boolean",
        options.emitAddListWhenCreatingQueue,
        "DisTubeOptions.emitAddListWhenCreatingQueue"
      );
    }
    if (typeof options.streamType !== "number" || isNaN(options.streamType) || !StreamType[options.streamType]) {
      throw new DisTubeError("INVALID_TYPE", "StreamType", options.streamType, "DisTubeOptions.streamType");
    }
    if (typeof options.directLink !== "boolean") {
      throw new DisTubeError("INVALID_TYPE", "boolean", options.directLink, "DisTubeOptions.directLink");
    }
  }
}
