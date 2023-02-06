import * as _DiscordVoice from "@discordjs/voice";

import { DisTubeVoice as _DTV, DisTubeVoiceManager } from "@";

jest.mock("@/core/DisTubeVoice");
jest.mock("@discordjs/voice");

const DisTubeVoice = _DTV as unknown as jest.Mocked<typeof _DTV>;
const DiscordVoice = _DiscordVoice as unknown as jest.Mocked<typeof _DiscordVoice>;

function createFakeDisTube() {
  return {
    client: { user: { id: "123" } }
  };
}

const distube = createFakeDisTube();
const manager = new DisTubeVoiceManager(distube as any);
const channel1: any = {
  guildId: "123456789123456789"
};
const channel2: any = {
  guildId: "123456789012345678"
};

test("DisTubeVoiceManager#create()", () => {
  const voice = manager.create(channel1);
  manager.add(channel1.guildId, voice);
  expect(voice).toBeInstanceOf(DisTubeVoice);
  expect(DisTubeVoice).toBeCalledTimes(1);
  expect(manager.get(channel1)).toBe(voice);
  const existing = manager.create(channel1);
  expect(existing).toBe(voice);
  expect(DisTubeVoice).toBeCalledTimes(1);
});

test("DisTubeVoiceManager#join()", () => {
  manager.join(channel1);
  expect(manager.get(channel1).join).toBeCalledTimes(1);
  expect(manager.get(channel1).join).toBeCalledWith(channel1);
  manager.create = jest.fn();
  const fVoice = { join: jest.fn() };
  (manager.create as jest.Mock).mockReturnValueOnce(fVoice);
  manager.join(channel2);
  expect(manager.create).toBeCalledWith(channel2);
  expect(fVoice.join).toBeCalledTimes(1);
});

test("DisTubeVoiceManager#leave()", () => {
  manager.leave(channel1);
  expect(manager.get(channel1).leave).toBeCalledTimes(1);
  const fConnection = {
    destroy: jest.fn(),
    state: {
      status: DiscordVoice.VoiceConnectionStatus.Destroyed
    }
  };
  DiscordVoice.getVoiceConnection.mockReturnValue(fConnection as any);
  manager.leave(channel2);
  expect(DiscordVoice.getVoiceConnection).nthCalledWith(1, channel2.guildId, distube.client.user.id);
  expect(fConnection.destroy).not.toBeCalled();
  fConnection.state.status = DiscordVoice.VoiceConnectionStatus.Ready;
  manager.leave(channel2);
  expect(DiscordVoice.getVoiceConnection).nthCalledWith(1, channel2.guildId, distube.client.user.id);
  expect(fConnection.destroy).toBeCalledTimes(1);
});
