import type { GuildMember } from "discord.js";
import { request } from "undici";

import { ExtractorPlugin } from "../struct/ExtractorPlugin";
import { Song } from "../struct/Song";

export class DirectLinkPlugin extends ExtractorPlugin {
  override async validate(url: string) {
    try {
      const headers = await request(url, { method: "HEAD" }).then(res => res.headers);
      const type = headers["content-type"];

      if (type?.startsWith("audio")) return true;
    } catch (e) {
      console.error(e);
    }
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async resolve(url: string, options: { member?: GuildMember; metadata?: any } = {}) {
    url = url.replace(/\/+$/, "");
    return new Song(
      {
        name: url.substring(url.lastIndexOf("/") + 1).replace(/((\?|#).*)?$/, "") || url,
        url,
        src: "direct_link"
      },
      options
    );
  }
}
