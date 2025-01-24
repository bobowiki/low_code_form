import { useEffect } from 'react';
import { Space, Button } from 'antd';
import { useDesigner, TextWidget } from '@pind/designable-react';
import { GlobalRegistry } from '@pind/designable-core';
import { observer } from '@formily/react';
import { loadInitialSchema, saveSchema } from '../service';
import { transformToSchema } from '@pind/designable-formily-transformer';

const supportLocales = ['zh-cn', 'en-us', 'ko-kr'];

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  useEffect(() => {
    loadInitialSchema(designer);
  }, [designer]);
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn');
    }
  }, []);
  return (
    <Space style={{ marginRight: 10 }}>
      <Button
        onClick={() => {
          const tree = designer.getCurrentTree();
          if (tree) {
            console.log('saveSchema', transformToSchema(tree));
            saveSchema(designer);
          }
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          saveSchema(designer);
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  );
});
