import { Collection } from "discord.js";

import { DisTubeBase } from "../DisTubeBase";

/**
 * Manages the collection of a data model.
 * @abstract
 * @private
 * @extends DisTubeBase
 */
export abstract class BaseManager<V> extends DisTubeBase {
  /**
   * The collection of items for this manager.
   * @type {Collection}
   * @name BaseManager#collection
   */
  collection = new Collection<string, V>();
  /**
   * The size of the collection.
   * @type {number}
   */
  get size() {
    return this.collection.size;
  }
}
