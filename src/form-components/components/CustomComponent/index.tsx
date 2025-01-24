import React from 'react';
import { Button as AntdButton } from 'antd';

import { createBehavior, createResource } from '@pind/designable-core';
import { DnFC } from '@pind/designable-react';
// import { createVoidFieldSchema } from '../Field';
// import { AllSchemas } from '../../schemas';
// import { AllLocales } from '../../locales';

export const CustomComponent: DnFC<React.ComponentProps<typeof AntdButton>> = (
  props,
) => {
  return <AntdButton {...props}>{props.children || '按钮'}</AntdButton>;
};

CustomComponent.Behavior = createBehavior({
  name: 'CustomComponent',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'CustomComponent',
  designerProps: {
    droppable: true,
    // propsSchema: createVoidFieldSchema(AllSchemas.Card),
  },
  //   designerLocales: AllLocales.Card,
});

CustomComponent.Resource = createResource('Inputs', {
  icon: 'CustomComponent',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'CustomComponent',
        'x-component-props': {
          title: 'Title',
        },
      },
    },
  ],
});
