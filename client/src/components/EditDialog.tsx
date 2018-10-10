import { Modal } from 'antd';
import * as React from 'react';

interface IEditDialogProps {
  visible: boolean;
  handleCancel: (e: any) => void;
}

class EditDialog extends React.Component<IEditDialogProps> {
  public render() {
    return (
      <Modal
        title="Редактировать фильм"
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
      />
    );
  }
}

export default EditDialog;
