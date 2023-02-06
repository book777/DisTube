import { Client } from "discord.js";

import {
  CustomPlugin,
  defaultFilters,
  DisTube,
  DisTubeError,
  DisTubeHandler,
  DisTubeVoiceManager,
  ExtractorPlugin,
  Options,
  PluginType,
  QueueManager,
  SearchResultPlaylist,
  SearchResultVideo,
  Song
} from "@";
import * as _Util from "@/util";

import { playlistResults, videoResults } from "./raw";

jest.mock("@/util");

const Util = _Util as unknown as jest.Mocked<typeof _Util>;

const member: any = {};
const songResult = new SearchResultVideo(videoResults.items[0]);
const plResult = new SearchResultPlaylist(playlistResults.items[0]);
const metadata = { test: "sth" };
const song = new Song({ id: "xxxxxxxxxxx", url: "https://www.youtube.com/watch?v=xxxxxxxxxxx" }, { member, metadata });
const anotherSong = new Song(
  { id: "y", url: "https://www.youtube.com/watch?v=y" },
  { member, source: "test", metadata }
);

const extractor = {
  type: "extractor",
  validate: jest.fn(),
  resolve: jest.fn(),
  init: jest.fn()
};

beforeAll(() => {
  jest.resetAllMocks();
});

describe("Constructor", () => {
  test("#1", () => {
    Util.isClientInstance.mockReturnValueOnce(false);
    expect(() => new DisTube({})).toThrow(new DisTubeError("INVALID_TYPE", "Discord.Client", {}, "client"));
    const c = new Client({ intents: [] });
    Util.isClientInstance.mockReturnValueOnce(true);
    Util.checkIntents.mockImplementationOnce(() => {
      throw new DisTubeError("MISSING_INTENTS", "GuildVoiceStates");
    });
    expect(() => new DisTube(c)).toThrow(new DisTubeError("MISSING_INTENTS", "GuildVoiceStates"));
  });

  test("#2", () => {
    const client = new Client({ intents: ["GuildVoiceStates"] });
    jest.spyOn(client, "on");
    Util.isClientInstance.mockReturnValueOnce(true);
    const distube = new DisTube(client, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      plugins: [new ExtractorPlugin(), new CustomPlugin()]
    });
    expect(distube.client).toBe(client);
    expect(distube.voices).toBeInstanceOf(DisTubeVoiceManager);
    expect(distube.options).toBeInstanceOf(Options);
    expect(distube.handler).toBeInstanceOf(DisTubeHandler);
    expect(distube.queues).toBeInstanceOf(QueueManager);
    expect(distube.filters).toEqual(defaultFilters);
    expect(distube.extractorPlugins.find(p => p.type === PluginType.CUSTOM)).toBeFalsy();
    expect(distube.customPlugins.find(p => p.type === PluginType.EXTRACTOR)).toBeFalsy();
  });

  test("#3", () => {
    const client = new Client({ intents: ["GuildVoiceStates"] });
    jest.spyOn(client, "on");
    Util.isClientInstance.mockReturnValueOnce(true);
    const distube = new DisTube(client, {
      leaveOnEmpty: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      plugins: [new ExtractorPlugin(), new CustomPlugin()]
    });
    expect(distube.client).toBe(client);
    expect(distube.voices).toBeInstanceOf(DisTubeVoiceManager);
    expect(distube.options).toBeInstanceOf(Options);
    expect(distube.handler).toBeInstanceOf(DisTubeHandler);
    expect(distube.queues).toBeInstanceOf(QueueManager);
    expect(distube.filters).toEqual(defaultFilters);
    expect(distube.extractorPlugins.find(p => p.type === PluginType.CUSTOM)).toBeFalsy();
    expect(distube.customPlugins.find(p => p.type === PluginType.EXTRACTOR)).toBeFalsy();
    expect(client.on).not.toBeCalled();
  });
});

describe("DisTube#createCustomPlaylist()", () => {
  const client = new Client({ intents: ["GuildVoiceStates"] });
  Util.isClientInstance.mockReturnValueOnce(true);
  const distube = new DisTube(client, {
    plugins: [extractor as unknown as ExtractorPlugin]
  });
  new DisTubeHandler(distube as any);

  test("songs is not an array", async () => {
    await expect(distube.createCustomPlaylist("" as any)).rejects.toThrow(
      new DisTubeError("INVALID_TYPE", "Array", "", "songs")
    );
  });

  test("songs is an empty array", async () => {
    await expect(distube.createCustomPlaylist([])).rejects.toThrow(new DisTubeError("EMPTY_ARRAY", "songs"));
  });

  test("songs is an array of invalid types", async () => {
    Util.isURL.mockReturnValue(false);
    await expect(distube.createCustomPlaylist([""])).rejects.toThrow(new DisTubeError("NO_VALID_SONG"));
  });

  test("parallel is true", async () => {
    Util.isRecord.mockReturnValue(true);
    const name = "a custom playlist";
    Util.isURL.mockReturnValueOnce(true).mockReturnValueOnce(false);
    const result = await distube.createCustomPlaylist(["not an url", song, anotherSong, songResult], {
      properties: { name },
      parallel: true,
      metadata
    });
    expect(result.songs.length).toBe(3);
    expect(result.songs[0]).toBe(song);
    expect(result.songs[1]).toBe(anotherSong);
    expect(result.songs[2]).toBeInstanceOf(Song);
    expect(result.name).toBe(name);
    expect(result.metadata).toBe(metadata);
  });

  test("parallel is false", async () => {
    Util.isURL.mockReturnValueOnce(true);
    extractor.validate.mockReturnValue(false);
    const result = await distube.createCustomPlaylist(["not an url", anotherSong, song, plResult], {
      parallel: false,
      metadata
    });
    expect(result.songs.length).toBe(2);
    expect(result.songs[1]).toBe(song);
    expect(result.songs[0]).toBe(anotherSong);
    expect(result.metadata).toBe(metadata);
  });
});

test.todo("The rest of DisTube's methods");
