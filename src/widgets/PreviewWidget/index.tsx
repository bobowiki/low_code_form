import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { TreeNode } from '@pind/designable-core';
import { transformToSchema } from '@pind/designable-formily-transformer';
import React, { useMemo } from 'react';
import * as components from './components';
import { Form } from './components';

import { Alert } from 'antd';

// 添加自定义 ErrorBoundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Alert type="error" message="Something went wrong" />;
    }
    return this.props.children;
  }
}

const SchemaField = createSchemaField({
  components,
});

export interface IPreviewWidgetProps {
  tree: TreeNode;
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), []);
  const { form: formProps, schema } = transformToSchema(props.tree);
  return (
    <ErrorBoundary>
      <Form {...formProps} form={form}>
        <SchemaField schema={schema} />
      </Form>
    </ErrorBoundary>
  );
};
