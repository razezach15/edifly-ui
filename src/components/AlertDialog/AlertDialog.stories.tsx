import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from './AlertDialog';
import { Button } from '../Button';
import { useState } from 'react';

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger'],
    },
    open: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
    maskClosable: {
      control: 'boolean',
    },
    centered: {
      control: 'boolean',
    },
    confirmLoading: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Open Alert Dialog
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          description="Are you sure you want to perform this action? This cannot be undone."
          onConfirm={() => {
            console.log('Confirmed!');
            setOpen(false);
          }}
          onCancel={() => {
            console.log('Cancelled!');
            setOpen(false);
          }}
        />
      </>
    );
  },
};

export const Success: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="success" onClick={() => setOpen(true)}>
          Show Success Dialog
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          variant="success"
          title="Success!"
          description="Your operation has been completed successfully."
          confirmText="Great!"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Warning: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="warning" onClick={() => setOpen(true)}>
          Show Warning Dialog
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          variant="warning"
          title="Warning"
          description="This action may have unintended consequences. Please proceed with caution."
          confirmText="Proceed Anyway"
          cancelText="Cancel"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Danger: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
        console.log('Deleted!');
      }, 2000);
    };
    
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          variant="danger"
          title="Delete Item"
          description="This item will be permanently deleted. This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          confirmLoading={loading}
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Info: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Show Info Dialog
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          variant="info"
          title="Information"
          description="Here's some important information you should know about this feature."
          confirmText="Got it"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

export const WithCustomContent: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Show Custom Content
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Account Settings"
          description="Review and confirm your account settings changes:"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '4px',
            margin: '8px 0'
          }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Changes to be applied:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
              <li>Email notifications: Enabled</li>
              <li>Two-factor authentication: Enabled</li>
              <li>Profile visibility: Private</li>
            </ul>
          </div>
        </AlertDialog>
      </>
    );
  },
};

export const NotClosable: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Open Non-closable Dialog
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Required Action"
          description="You must choose an option to continue."
          closable={false}
          maskClosable={false}
          confirmText="Accept"
          cancelText="Decline"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};

export const CustomWidth: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Open Wide Dialog
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Wide Dialog"
          description="This dialog has a custom width of 600px to accommodate more content."
          width={600}
          onConfirm={() => setOpen(false)}
        >
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '16px',
            marginTop: '16px'
          }}>
            <div>
              <h4 style={{ margin: '0 0 8px 0' }}>Left Column</h4>
              <p style={{ margin: 0, fontSize: '13px' }}>
                Some additional content that requires more space to display properly.
              </p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0' }}>Right Column</h4>
              <p style={{ margin: 0, fontSize: '13px' }}>
                More content that benefits from the wider dialog layout.
              </p>
            </div>
          </div>
        </AlertDialog>
      </>
    );
  },
};

export const AllVariants: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
  render: () => {
    const [openDialogs, setOpenDialogs] = useState({
      info: false,
      success: false,
      warning: false,
      danger: false,
    });
    
    const openDialog = (type: keyof typeof openDialogs) => {
      setOpenDialogs(prev => ({ ...prev, [type]: true }));
    };
    
    const closeDialog = (type: keyof typeof openDialogs) => {
      setOpenDialogs(prev => ({ ...prev, [type]: false }));
    };
    
    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="secondary" onClick={() => openDialog('info')}>
          Info Dialog
        </Button>
        <Button variant="success" onClick={() => openDialog('success')}>
          Success Dialog
        </Button>
        <Button variant="warning" onClick={() => openDialog('warning')}>
          Warning Dialog
        </Button>
        <Button variant="danger" onClick={() => openDialog('danger')}>
          Danger Dialog
        </Button>
        
        <AlertDialog
          open={openDialogs.info}
          onClose={() => closeDialog('info')}
          variant="info"
          title="Information"
          description="This is an informational dialog."
          confirmText="OK"
          onConfirm={() => closeDialog('info')}
        />
        
        <AlertDialog
          open={openDialogs.success}
          onClose={() => closeDialog('success')}
          variant="success"
          title="Success"
          description="Operation completed successfully!"
          confirmText="Great!"
          onConfirm={() => closeDialog('success')}
        />
        
        <AlertDialog
          open={openDialogs.warning}
          onClose={() => closeDialog('warning')}
          variant="warning"
          title="Warning"
          description="Please be careful with this action."
          confirmText="Proceed"
          cancelText="Cancel"
          onConfirm={() => closeDialog('warning')}
          onCancel={() => closeDialog('warning')}
        />
        
        <AlertDialog
          open={openDialogs.danger}
          onClose={() => closeDialog('danger')}
          variant="danger"
          title="Danger"
          description="This action is dangerous and cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => closeDialog('danger')}
          onCancel={() => closeDialog('danger')}
        />
      </div>
    );
  },
};