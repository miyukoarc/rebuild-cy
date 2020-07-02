<template>
  <div>
    <tags-drawer></tags-drawer>
    <div>
      <user-drawer :hasPop="true" :users="users"></user-drawer>
    </div>
  </div>
</template>

<script>
import TagsDrawer from "@/components/TagsDrawer";
import UserDrawer from "@/components/UserDrawer";
export default {
  components: {
    TagsDrawer,
    UserDrawer
  },
  data() {
    return {
      tagGroups: [
        {
          groupName: "4444",
          groupId: "etrbZlEAAAz4ugQ__KLGvLr7j_mem2pw",
          tags: [
            {
              createdAt: "2020-06-30 13:41:56",
              groupName: "4444",
              deleted: false,
              tagId: "etrbZlEAAAcSIt3wp3eI7GtsSCyeTEAg",
              groupId: "etrbZlEAAAz4ugQ__KLGvLr7j_mem2pw",
              sort: 1,
              tagName: "66666",
              type: 1,
              uuid: 81,
              version: 0,
              auditState: 1,
              updatedAt: "2020-06-30 13:41:56"
            },
            {
              createdAt: "2020-06-30 13:41:56",
              groupName: "4444",
              deleted: false,
              tagId: "etrbZlEAAAviWsuGp3nnYZLKbrLvTanw",
              groupId: "etrbZlEAAAz4ugQ__KLGvLr7j_mem2pw",
              sort: 1,
              tagName: "555555555",
              type: 1,
              uuid: 80,
              version: 0,
              auditState: 1,
              updatedAt: "2020-06-30 13:41:56"
            }
          ]
        },
        {
          groupName: "6/24测试2",
          groupId: "etrbZlEAAAoj2QO9yOV0_AZbDWaY832g",
          tags: [
            {
              createdAt: "2020-06-24 14:15:51",
              groupName: "6/24测试2",
              deleted: false,
              tagId: "etrbZlEAAAcA7tAzt1tmIA15P9vl8OcA",
              groupId: "etrbZlEAAAoj2QO9yOV0_AZbDWaY832g",
              sort: 1,
              tagName: "6/24测试2",
              type: 1,
              uuid: 79,
              version: 0,
              auditState: 1,
              updatedAt: "2020-06-24 14:15:51"
            }
          ]
        },
        {
          groupName: "6/24测试",
          groupId: "etrbZlEAAA9g32Nrsiy_AvgyYnVohNTA",
          tags: [
            {
              createdAt: "2020-06-24 14:13:12",
              groupName: "6/24测试",
              deleted: false,
              tagId: "etrbZlEAAA4LBwn2tZcUphUvdT334rRw",
              groupId: "etrbZlEAAA9g32Nrsiy_AvgyYnVohNTA",
              sort: 1,
              tagName: "6/24测试",
              type: 1,
              uuid: 78,
              version: 0,
              auditState: 1,
              updatedAt: "2020-06-24 14:13:12"
            }
          ]
        },
        {
          groupName: "测试",
          groupId: "etrbZlEAAA8CJfilVt0jAk1qigBfjtzQ",
          tags: [
            {
              createdAt: "2020-06-23 16:32:22",
              groupName: "测试",
              deleted: false,
              tagId: "etrbZlEAAA3OyBCyrbkzHI7w_wVYfBdw",
              groupId: "etrbZlEAAA8CJfilVt0jAk1qigBfjtzQ",
              sort: 1,
              tagName: "测试",
              type: 1,
              uuid: 77,
              version: 0,
              auditState: 1,
              updatedAt: "2020-06-23 16:32:22"
            }
          ]
        },
        {
          groupName: "最大盈利行 ",
          groupId: "etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ",
          tags: [
            {
              createdAt: "2020-06-20 17:54:22",
              groupName: "最大盈利行 ",
              deleted: false,
              tagId: "etrbZlEAAAZURSd59N68GlAAbpxFv18g",
              groupId: "etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ",
              sort: 1,
              tagName: "网络科技 ",
              type: 1,
              uuid: 70,
              version: 0,
              auditState: 1,
              updatedAt: "2020-06-20 17:54:22"
            },
            {
              createdAt: "2020-06-20 17:54:22",
              groupName: "最大盈利行 ",
              deleted: false,
              tagId: "etrbZlEAAA1vdhfTkSnLYXPiXx3JO7Pg",
              groupId: "etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ",
              sort: 1,
              tagName: "综合",
              type: 1,
              uuid: 69,
              version: 0,
              auditState: 1,
              updatedAt: "2020-06-20 17:54:22"
            },
            {
              createdAt: "2020-06-20 17:54:22",
              groupName: "最大盈利行 ",
              deleted: false,
              tagId: "etrbZlEAAAjFfnE3cKRLEhXY0o_3rjyg",
              groupId: "etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ",
              sort: 1,
              tagName: "大金融",
              type: 1,
              uuid: 68,
              version: 0,
              auditState: 1,
              updatedAt: "2020-06-20 17:54:22"
            },
            {
              createdAt: "2020-06-20 17:54:22",
              groupName: "最大盈利行 ",
              deleted: false,
              tagId: "etrbZlEAAAAoRMnFeBkeNV_5DGzDMJeg",
              groupId: "etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ",
              sort: 1,
              tagName: "大消费",
              type: 1,
              uuid: 67,
              version: 0,
              auditState: 1,
              updatedAt: "2020-06-20 17:54:22"
            },
            {
              createdAt: "2020-06-20 17:54:22",
              groupName: "最大盈利行 ",
              deleted: false,
              tagId: "etrbZlEAAABVHrxDrgrvGYGG4AFBRz_A",
              groupId: "etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ",
              sort: 1,
              tagName: "大健康",
              type: 1,
              uuid: 66,
              version: 0,
              auditState: 1,
              updatedAt: "2020-06-20 17:54:22"
            }
          ]
        }
      ],
      users: [
        {
          isMessageUser: false,
          gender: 1,
          isLeader: 0,
          mobile: "",
          avatar:
            "http://wework.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDqymbAQJztBK5wVJkGCVFPN28FBgE3KUKKoqBia13ZPLQLjyWuw5mjsI/0",
          userId: "gion",
          version: 2,
          uuid: 15,
          createdAt: "2020-06-23 12:28:35",
          deleted: false,
          qrCode:
            "https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vcd1ad9b75459ce243",
          name: "薛强强",
          alias: "",
          position: "",
          updatedAt: "2020-06-30 20:23:10",
          isFollowUser: true,
          status: 1
        },
        {
          isMessageUser: false,
          gender: 1,
          isLeader: 0,
          mobile: "",
          avatar:
            "http://wework.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDqymbAQJztBK5wVJkGCVFPN28FBgE3KUKKoqBia13ZPLQLjyWuw5mjsI/0",
          userId: "gion",
          version: 2,
          uuid: 1,
          createdAt: "2020-06-23 12:28:35",
          deleted: false,
          qrCode:
            "https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vcd1ad9b75459ce243",
          name: "薛强",
          alias: "",
          position: "",
          updatedAt: "2020-06-30 20:23:10",
          isFollowUser: true,
          status: 1
        },
        {
          isMessageUser: false,
          gender: 1,
          isLeader: 0,
          mobile: "",
          avatar:
            "http://wework.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDqymbAQJztBK5wVJkGCVFPN28FBgE3KUKKoqBia13ZPLQLjyWuw5mjsI/0",
          userId: "gion",
          version: 2,
          uuid: 2,
          createdAt: "2020-06-23 12:28:35",
          deleted: false,
          qrCode:
            "https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vcd1ad9b75459ce243",
          name: "薛强",
          alias: "",
          position: "",
          updatedAt: "2020-06-30 20:23:10",
          isFollowUser: true,
          status: 1
        },
        {
          isMessageUser: false,
          gender: 1,
          isLeader: 0,
          mobile: "",
          avatar:
            "http://wework.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDqymbAQJztBK5wVJkGCVFPN28FBgE3KUKKoqBia13ZPLQLjyWuw5mjsI/0",
          userId: "gion",
          version: 2,
          uuid: 3,
          createdAt: "2020-06-23 12:28:35",
          deleted: false,
          qrCode:
            "https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vcd1ad9b75459ce243",
          name: "薛强",
          alias: "",
          position: "",
          updatedAt: "2020-06-30 20:23:10",
          isFollowUser: true,
          status: 1
        }
      ]
    };
  }
};
</script>

<style>
</style>