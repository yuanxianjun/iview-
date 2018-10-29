const btns = {
  delete: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        title: '你确定要删除吗?'
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-delete', params)
          vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'error',
          ghost: false

        }
      }, '删除')
    ])
  },
  // 编辑按钮
  edit: (h, params, vm) => {
    return h('span', {
      style: {
        marginLeft: '10px'
      },
      on: {
        'click': () => {
          vm.$emit('on-edit', params)
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'success',
          ghost: false

        }
      }, '编辑')
    ])
  },
  // 详情按钮
  details: (h, params, vm) => {
    return h('span', {
      style: {
        marginLeft: '10px'
      },
      on: {
        'click': () => {
          vm.$emit('on-detail', params)
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'primary',
          ghost: false

        }
      }, '详情')
    ])
  },
  // 导入按钮
  guideIn: (h, params, vm) => {
    return h('span', {
      style: {
        marginLeft: '10px'
      },
      on: {
        'click': () => {
          vm.$emit('on-fileIn', params)
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'default',
          ghost: false

        }
      }, '导入')
    ])
  }
}

export default btns
