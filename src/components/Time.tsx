import { useState } from 'react';
import { Snackbar, Tooltip, Typography } from '@mui/material';

type Props = {
  children: string | number;
};

const fontSize = {
  xs: '16vw',
  md: '12vw',
  lg: '8vw',
};

export const Time = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  const handleCopyToClipboard = () => {
    if (children) {
      navigator.clipboard.writeText(children.toString());
      setOpen(true);
    }
  };

  return (
    <>
      <Tooltip title="Copy to clipboard">
        <Typography
          role="button"
          tabIndex={0}
          onClick={handleCopyToClipboard}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleCopyToClipboard();
            }
          }}
          variant="h2"
          sx={{ mb: 2 }}
          fontSize={fontSize}
          data-testid="total-time"
        >
          {children}
        </Typography>
      </Tooltip>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        data-testid="copy-snackbar"
        slotProps={{
          content: {
            sx: {
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            },
          },
        }}
        message={
          <span data-testid="copy-snackbar-message">Copied to clipboard</span>
        }
      />
    </>
  );
};
