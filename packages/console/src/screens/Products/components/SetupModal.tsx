import * as React from 'react';
import { useDialogState, DialogDisclosure, Dialog, DialogBackdrop } from 'reakit';

const SetupModal = () => {
  const dialog = useDialogState();
  console.log(dialog)
  return (
    <>
      <DialogBackdrop {...dialog} visible={true}>
        <Dialog {...dialog} aria-label="Welcome" visible={true}>
          Welcome to Reakit!
        </Dialog>
      </DialogBackdrop>
    </>
  );
};

export default SetupModal;
