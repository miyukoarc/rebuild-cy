/*
 * @Author: your name
 * @Date: 2020-07-01 10:56:54
 * @LastEditTime: 2020-07-01 16:45:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\utils\externalUser.js
 */
export function dataConversion(res) {
  let data = Object.values(res);
  let externalUserListData = [];
  console.log(data, 'data')
  data.map((list) => {
    let externalUserItemData = {
      externalUser: {},
      users: [],
      tags: []
    };
    [list].map(item => {
      externalUserItemData.externalUser = {
        ...item
      }
      externalUserItemData.users.push(item.user);
      if (Object.keys(item.tags).length) {
        let tags = item.tags.reduce((pre, next) => {
          let hasTag = pre.findIndex(
            tag => tag.groupName === next.groupName
          );
          if (hasTag < 0) {
            pre.push({
              groupName: next.groupName,
              groupId: next.groupId,
              tagnames: [next]
            });
          } else {
            pre[hasTag].tagnames.push(next);
          }
          return pre;
        }, []);
        externalUserItemData.tags = externalUserItemData.tags.concat(
          tags
        );
      }
    });
    externalUserListData.push(externalUserItemData);
  });
  return externalUserListData
}
