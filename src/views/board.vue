<template>
  <div>
    <div>
      <!-- <tags-drawer :tags="tagGroups">
      </tags-drawer> -->
    </div>

    <div>
        <icon-tooltip>
            <div slot="tips">
                message
            </div>
        </icon-tooltip>

    </div>
    <div>
      <user-drawer :hasPop="true" :users="users" >
      </user-drawer>
    </div>

    <div>
        <async-user-drawer :hasPop="true" :users="users"></async-user-drawer>
    </div>

    <!-- <div>
      <Cascader :options="tree"></Cascader>
    </div>-->

    <div>
        <async-user-tag size="small" v-for="item in users" type="info" :key="item.uuid" :uuid="item.uuid"><i class="el-icon-user-solid"></i>{{item.name}}</async-user-tag>
    </div>

    <div>

    </div>

    <div>
      <!-- <select-tree  :options="options" :props="defaultProps" v-model="selected"></select-tree> -->
      <el-select-tree
        :default-expand-all="defaultExpandAll"
        :multiple="multiple"
        :placeholder="placeholder"
        :disabled="disabled"
        :popover-min-width="100"
        :data="treeData"
        :props="treeProps"
        :disabled-values="disabledValues"
        :check-strictly="checkStrictly"
        :clearable="clearable"
        v-model="value1"
      ></el-select-tree>
    </div>

    <div style="margin:30px 0;">
        <complex-select v-model="selects" :options="departmentList"></complex-select>
    </div>
  </div>
</template>

<script>
import IconTooltip from '@/components/IconTooltip'
import UserTag from '@/components/UserTag'
import TagsDrawer from '@/components/TagsDrawer'
import UserDrawer from '@/components/UserDrawer'
import Cascader from '@/components/Cascader'
import AsyncUserTag from '@/components/AsyncUserTag'
import AsyncUserDrawer from '@/components/AsyncUserDrawer'
import ComplexSelect from '@/components/ComplexSelect'
import { mapState } from 'vuex'
export default {
  components: {
    TagsDrawer,
    UserDrawer,
    Cascader,AsyncUserTag,
    UserTag,
    AsyncUserDrawer,
    IconTooltip,
    ComplexSelect
  },
//   directives: {
//   loading: {
//     // 指令的定义
//     componentUpdated: function (el,binding) {
//         if(binding.value){
//             document.querySelector('#loading').style.display = ''
//         }else{
//             document.querySelector('#loading').style.display = 'none'
//         }
//     //   el.focus()
//     }
//   }
// },
  data() {
    return {
        loading: false,
      msg: '',
      status: false,
      selects: [],
      users: [
        {
          isMessageUser: false,
          gender: 1,
          isLeader: 0,
          mobile: '',
          avatar:
            'http://wework.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDqymbAQJztBK5wVJkGCVFPN28FBgE3KUKKoqBia13ZPLQLjyWuw5mjsI/0',
          userId: 'gion',
          version: 2,
          uuid: 15,
          createdAt: '2020-06-23 12:28:35',
          deleted: false,
          qrCode:
            'https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vcd1ad9b75459ce243',
          name: '薛强强',
          alias: '',
          position: '',
          updatedAt: '2020-06-30 20:23:10',
          isFollowUser: true,
          status: 1
        },
        {
          isMessageUser: false,
          gender: 1,
          isLeader: 0,
          mobile: '',
          avatar:
            'http://wework.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDqymbAQJztBK5wVJkGCVFPN28FBgE3KUKKoqBia13ZPLQLjyWuw5mjsI/0',
          userId: 'gion',
          version: 2,
          uuid: 1,
          createdAt: '2020-06-23 12:28:35',
          deleted: false,
          qrCode:
            'https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vcd1ad9b75459ce243',
          name: '薛强',
          alias: '',
          position: '',
          updatedAt: '2020-06-30 20:23:10',
          isFollowUser: true,
          status: 1
        },
        {
          isMessageUser: false,
          gender: 1,
          isLeader: 0,
          mobile: '',
          avatar:
            'http://wework.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDqymbAQJztBK5wVJkGCVFPN28FBgE3KUKKoqBia13ZPLQLjyWuw5mjsI/0',
          userId: 'gion',
          version: 2,
          uuid: 2,
          createdAt: '2020-06-23 12:28:35',
          deleted: false,
          qrCode:
            'https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vcd1ad9b75459ce243',
          name: '薛强',
          alias: '',
          position: '',
          updatedAt: '2020-06-30 20:23:10',
          isFollowUser: true,
          status: 1
        },
        {
          isMessageUser: false,
          gender: 1,
          isLeader: 0,
          mobile: '',
          avatar:
            'http://wework.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDqymbAQJztBK5wVJkGCVFPN28FBgE3KUKKoqBia13ZPLQLjyWuw5mjsI/0',
          userId: 'gion',
          version: 2,
          uuid: 3,
          createdAt: '2020-06-23 12:28:35',
          deleted: false,
          qrCode:
            'https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vcd1ad9b75459ce243',
          name: '薛强',
          alias: '',
          position: '',
          updatedAt: '2020-06-30 20:23:10',
          isFollowUser: true,
          status: 1
        }
      ],
      clearable: true,
      defaultExpandAll: true,
      multiple: true,
      placeholder: 'please choose',
      disabled: false,
      checkStrictly: false,
      treeData: [
        {
          label: '新疆维吾尔自治区',
          id: '1',
          childrens: [
            {
              label: '乌鲁木齐市',
              id: '2',
              childrens: [
                { label: '达坂城区', id: '7', childrens: [] },
                { label: '头屯河区', id: '8', childrens: [] },
                { label: '乌鲁木齐县', id: '9', childrens: [] }
              ]
            },
            {
              label: '克拉玛依市',
              id: '3',
              childrens: [
                { label: '克拉玛依区', id: '10', childrens: [] },
                { label: '白碱滩区', id: '11', childrens: [] },
                { label: '独山子区', id: '12', childrens: [] }
              ]
            },
            { label: '吐鲁番地区', id: '4', childrens: [] },
            { label: '哈密地区', id: '5', childrens: [] },
            { label: '昌吉回族自治州', id: '6', childrens: [] }
          ]
        }
      ],
      treeProps: {
        value: 'id',
        children: 'childrens',
        label: 'label'
      },
      value1: [],
      disabledValues: [],
      tagGroups: [
        {
          groupName: '4444',
          groupId: 'etrbZlEAAAz4ugQ__KLGvLr7j_mem2pw',
          tags: [
            {
              createdAt: '2020-06-30 13:41:56',
              groupName: '4444',
              deleted: false,
              tagId: 'etrbZlEAAAcSIt3wp3eI7GtsSCyeTEAg',
              groupId: 'etrbZlEAAAz4ugQ__KLGvLr7j_mem2pw',
              sort: 1,
              tagName: '66666',
              type: 1,
              uuid: 81,
              version: 0,
              auditState: 1,
              updatedAt: '2020-06-30 13:41:56'
            },
            {
              createdAt: '2020-06-30 13:41:56',
              groupName: '4444',
              deleted: false,
              tagId: 'etrbZlEAAAviWsuGp3nnYZLKbrLvTanw',
              groupId: 'etrbZlEAAAz4ugQ__KLGvLr7j_mem2pw',
              sort: 1,
              tagName: '555555555',
              type: 1,
              uuid: 80,
              version: 0,
              auditState: 1,
              updatedAt: '2020-06-30 13:41:56'
            }
          ]
        },
        {
          groupName: '6/24测试2',
          groupId: 'etrbZlEAAAoj2QO9yOV0_AZbDWaY832g',
          tags: [
            {
              createdAt: '2020-06-24 14:15:51',
              groupName: '6/24测试2',
              deleted: false,
              tagId: 'etrbZlEAAAcA7tAzt1tmIA15P9vl8OcA',
              groupId: 'etrbZlEAAAoj2QO9yOV0_AZbDWaY832g',
              sort: 1,
              tagName: '6/24测试2',
              type: 1,
              uuid: 79,
              version: 0,
              auditState: 1,
              updatedAt: '2020-06-24 14:15:51'
            }
          ]
        },
        {
          groupName: '6/24测试',
          groupId: 'etrbZlEAAA9g32Nrsiy_AvgyYnVohNTA',
          tags: [
            {
              createdAt: '2020-06-24 14:13:12',
              groupName: '6/24测试',
              deleted: false,
              tagId: 'etrbZlEAAA4LBwn2tZcUphUvdT334rRw',
              groupId: 'etrbZlEAAA9g32Nrsiy_AvgyYnVohNTA',
              sort: 1,
              tagName: '6/24测试',
              type: 1,
              uuid: 78,
              version: 0,
              auditState: 1,
              updatedAt: '2020-06-24 14:13:12'
            }
          ]
        },
        {
          groupName: '测试',
          groupId: 'etrbZlEAAA8CJfilVt0jAk1qigBfjtzQ',
          tags: [
            {
              createdAt: '2020-06-23 16:32:22',
              groupName: '测试',
              deleted: false,
              tagId: 'etrbZlEAAA3OyBCyrbkzHI7w_wVYfBdw',
              groupId: 'etrbZlEAAA8CJfilVt0jAk1qigBfjtzQ',
              sort: 1,
              tagName: '测试',
              type: 1,
              uuid: 77,
              version: 0,
              auditState: 1,
              updatedAt: '2020-06-23 16:32:22'
            }
          ]
        },
        {
          groupName: '最大盈利行 ',
          groupId: 'etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ',
          tags: [
            {
              createdAt: '2020-06-20 17:54:22',
              groupName: '最大盈利行 ',
              deleted: false,
              tagId: 'etrbZlEAAAZURSd59N68GlAAbpxFv18g',
              groupId: 'etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ',
              sort: 1,
              tagName: '网络科技 ',
              type: 1,
              uuid: 70,
              version: 0,
              auditState: 1,
              updatedAt: '2020-06-20 17:54:22'
            },
            {
              createdAt: '2020-06-20 17:54:22',
              groupName: '最大盈利行 ',
              deleted: false,
              tagId: 'etrbZlEAAA1vdhfTkSnLYXPiXx3JO7Pg',
              groupId: 'etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ',
              sort: 1,
              tagName: '综合',
              type: 1,
              uuid: 69,
              version: 0,
              auditState: 1,
              updatedAt: '2020-06-20 17:54:22'
            },
            {
              createdAt: '2020-06-20 17:54:22',
              groupName: '最大盈利行 ',
              deleted: false,
              tagId: 'etrbZlEAAAjFfnE3cKRLEhXY0o_3rjyg',
              groupId: 'etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ',
              sort: 1,
              tagName: '大金融',
              type: 1,
              uuid: 68,
              version: 0,
              auditState: 1,
              updatedAt: '2020-06-20 17:54:22'
            },
            {
              createdAt: '2020-06-20 17:54:22',
              groupName: '最大盈利行 ',
              deleted: false,
              tagId: 'etrbZlEAAAAoRMnFeBkeNV_5DGzDMJeg',
              groupId: 'etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ',
              sort: 1,
              tagName: '大消费',
              type: 1,
              uuid: 67,
              version: 0,
              auditState: 1,
              updatedAt: '2020-06-20 17:54:22'
            },
            {
              createdAt: '2020-06-20 17:54:22',
              groupName: '最大盈利行 ',
              deleted: false,
              tagId: 'etrbZlEAAABVHrxDrgrvGYGG4AFBRz_A',
              groupId: 'etrbZlEAAA81Mn1JEHTmPD9a9MvoIqOQ',
              sort: 1,
              tagName: '大健康',
              type: 1,
              uuid: 66,
              version: 0,
              auditState: 1,
              updatedAt: '2020-06-20 17:54:22'
            }
          ]
        }
      ],

      tree: [],
      tempUserDetail: {}
    }
  },
  computed: {
      ...mapState({
            departmentList: state => state.department.departmentList
      })
  },
  created() {
    setTimeout(() => {
      this.tree = [
        {
          name: '中国总公司',
          department: [
            {
              name: '人事部'
            },
            {
              name: '市场部'
            }
          ],
          children: [
            {
              name: '杭州分公司',
              children: [
                {
                  name: '余杭营业部',
                  department: [
                    {
                      name: '人事部'
                    },
                    {
                      name: '市场部'
                    }
                  ]
                },
                {
                  name: '萧山营业部',
                  department: [
                    {
                      name: '人事部'
                    },
                    {
                      name: '市场部'
                    }
                  ]
                }
              ],
              department: [
                {
                  name: '人事部'
                },
                {
                  name: '市场部'
                }
              ]
            },
            {
              name: '南京分公司',
              children: [
                {
                  name: '雨花台营业部',
                  department: [
                    {
                      name: '人事部'
                    },
                    {
                      name: '市场部'
                    }
                  ]
                },
                {
                  name: '玄武营业部',
                  department: [
                    {
                      name: '人事部'
                    },
                    {
                      name: '市场部'
                    }
                  ]
                }
              ],
              department: [
                {
                  name: '人事部'
                },
                {
                  name: '市场部'
                }
              ]
            }
          ]
        }
      ]
    }, 10)
    this.initData()
  },
  mounted(){
    //   console.log( document.querySelector('#loading'))
  },
  methods: {

    handleDetail(uuid){
        console.log(uuid)
        
    },
    initData() {
      this.$store
        .dispatch('department/getDepartmentListAll')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '初始化失败'
          })
        })
    },
  }
}
</script>

<style>
</style>