/**
 * @desc 个人中心 - 孩子信息 - 评价信息
 */

export default {
  name: 'UserChildEvaluation',

  functional: true,

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  render: (h, ctx) => {
    const gutter = '15px';

    const { teacher, date, test } = ctx.props.data;

    const renderSubsidiray = content => h('span',
      {
        style: {
          color: '#b2b2b2',
          'font-size': '12px',
        },
      },
      content,
    );

    return h('div',
      {
        style: {
          'margin-left': gutter,
          padding: gutter,
          'padding-left': 0,
        },
        class: 'user-child-evaluation',
      },
      [
        h('div',
          {
            style: {
              display: 'flex',
              'justify-content': 'space-between',
            },
          },
          [
            renderSubsidiray(`教师：${teacher}`),
            renderSubsidiray(date),
          ],
        ),
        h('div', null, test),
      ],
    );
  },
};
