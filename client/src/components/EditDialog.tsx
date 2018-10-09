import { Button, Modal } from 'antd';
import * as React from 'react';

interface IEditDialogProps {
  visible: boolean;
}

class EditDialog extends React.Component<IEditDialogProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <Modal title="title" visible={this.props.visible}>
        <Button />
      </Modal>
    );
  }
}

export default EditDialog;
