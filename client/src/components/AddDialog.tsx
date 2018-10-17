import { Button, Modal } from 'antd';
import * as React from 'react';
import './AddDialog.css';

interface IAddDialogProps {
  visible: boolean;
  handleCancel: (e: any) => void;
}

class AddDialog extends React.Component<IAddDialogProps> {
  constructor(props: IAddDialogProps) {
    super(props);

    this.onHandleCancel = this.onHandleCancel.bind(this);
  }

  public render() {
    const { visible } = this.props;
    return (
      <Modal
        className="EditDialog"
        title="Редактировать информацию о фильме"
        visible={visible}
        onCancel={this.onHandleCancel}
      >
        <Button />
      </Modal>
    );
  }

  private onHandleCancel(e: any) {
    this.props.handleCancel(e);
  }
}

export default AddDialog;
