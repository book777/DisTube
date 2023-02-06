export const rawClientUser = {
  verified: true,
  username: "Test",
  mfa_enabled: true,
  id: "732441066992566304",
  flags: 0,
  discriminator: "0000",
  bot: true,
  avatar: ""
};

export const rawGuild = {
  member_count: 15,
  preferred_locale: "en-US",
  stage_instances: [],
  stickers: [],
  voice_states: [],
  icon: "",
  application_command_count: 89,
  afk_channel_id: null,
  mfa_level: 0,
  unavailable: false,
  large: false,
  system_channel_flags: 0,
  vanity_url_code: null,
  verification_level: 1,
  public_updates_channel_id: "835876744317108254",
  max_video_channel_users: 25,
  name: "Test",
  rules_channel_id: "835876743847739454",
  channels: [
    {
      type: 0,
      topic: null,
      rate_limit_per_user: 0,
      position: 3,
      permission_overwrites: [],
      parent_id: "737499503384461323",
      nsfw: false,
      name: "text",
      last_message_id: "863623849421963284",
      id: "737499503384461325"
    },
    {
      user_limit: 10000,
      type: 13,
      topic: null,
      rtc_region: null,
      position: 0,
      permission_overwrites: [],
      parent_id: "737499503384461324",
      nsfw: false,
      name: "Stage",
      id: "835876864458489857",
      bitrate: 64000
    },
    {
      user_limit: 0,
      type: 2,
      rtc_region: null,
      position: 2,
      permission_overwrites: [],
      parent_id: "737499503384461324",
      nsfw: false,
      name: "Voice",
      id: "853225781604646933",
      bitrate: 64000
    }
  ],
  presences: [],
  banner: null,
  afk_timeout: 300,
  explicit_content_filter: 2,
  lazy: true,
  features: ["COMMUNITY", "NEWS"],
  premium_subscription_count: 0,
  description: null,
  region: "singapore",
  nsfw: false,
  splash: null,
  premium_tier: 0,
  system_channel_id: "737499503384461325",
  nsfw_level: 0,
  default_message_notifications: 0,
  emojis: [],
  joined_at: "2021-02-05T10:41:10.307000+00:00",
  discovery_splash: null,
  members: [
    {
      user: {
        username: "Skick",
        public_flags: 131136,
        id: "653848088280301571",
        discriminator: "4724",
        avatar: ""
      },
      roles: [],
      mute: false,
      joined_at: "2020-07-28T02:39:43.588000+00:00",
      hoisted_role: null,
      deaf: false
    },
    {
      user: {
        username: "Test",
        id: "732441066992566304",
        discriminator: "0000",
        bot: true,
        avatar: ""
      },
      roles: [],
      mute: false,
      joined_at: "2021-02-05T10:41:10.307000+00:00",
      hoisted_role: null,
      deaf: true
    }
  ],
  max_members: 100000,
  threads: [],
  id: "737499502763704370",
  roles: [],
  guild_hashes: {
    version: 1,
    roles: { omitted: false, hash: "OnVCeDuVZdU" },
    metadata: { omitted: false, hash: "5nPQTrBMzgo" },
    channels: { omitted: false, hash: "WCSDpgoi6A8" }
  },
  owner_id: "653848088280301571",
  application_id: null
};

export const rawMessage = {
  type: 0,
  tts: false,
  timestamp: "2222-02-22T22:22:22.000000+00:00",
  referenced_message: null,
  pinned: false,
  mentions: [],
  mention_roles: [],
  mention_everyone: false,
  member: {
    roles: ["807199132669444117"],
    mute: false,
    joined_at: "2021-02-05T10:41:10.307000+00:00",
    hoisted_role: null,
    deaf: true
  },
  id: "863630752813285376",
  flags: 0,
  embeds: [],
  edited_timestamp: null,
  content: "",
  components: [],
  channel_id: "737499503384461325",
  author: {
    public_flags: 0,
    username: "Test",
    id: "732441066992566304",
    discriminator: "0000",
    bot: true,
    avatar: ""
  },
  attachments: [],
  guild_id: "737499502763704370"
};

export const rawUserVoiceState = {
  member: {
    user: {
      username: "Skick",
      public_flags: 131136,
      id: "653848088280301571",
      discriminator: "4724",
      avatar: ""
    },
    roles: [],
    mute: false,
    joined_at: "2020-07-28T02:39:43.588000+00:00",
    hoisted_role: null,
    deaf: false
  },
  user_id: "653848088280301571",
  suppress: false,
  session_id: "bac0662e110d208565d5cbd35ee2a200",
  self_video: false,
  self_mute: false,
  self_deaf: false,
  request_to_speak_timestamp: null,
  mute: false,
  guild_id: "737499502763704370",
  deaf: false,
  channel_id: "853225781604646933"
};

export const rawBotVoiceState = {
  member: {
    user: {
      username: "Test",
      id: "732441066992566304",
      discriminator: "0000",
      bot: true,
      avatar: ""
    },
    roles: [],
    mute: false,
    joined_at: "2021-02-05T10:41:10.307000+00:00",
    hoisted_role: null,
    deaf: true
  },
  user_id: "732441066992566304",
  suppress: false,
  session_id: "b09816ae9e49bb26028d3ba8e383857b",
  self_video: false,
  self_mute: false,
  self_deaf: true,
  request_to_speak_timestamp: null,
  mute: false,
  guild_id: "737499502763704370",
  deaf: true,
  channel_id: "853225781604646933"
};
