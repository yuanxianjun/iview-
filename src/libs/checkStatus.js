export const checkTypeStatus = (arr) => {
  //   console.log('查看传过来的数组', arr)

  arr.forEach(item => {
    if (item.status === 1) {
      item.statusType = '有效'
    } else if (item.status === 2) {
      item.statusType = '禁用'
    }
  })
  return arr
}
