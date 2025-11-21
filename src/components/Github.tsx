import { Box, Tooltip } from '@mui/material';

export const GitHub = () => {
  return (
    <Tooltip title="GitHub Repository">
      <Box sx={{ marginTop: 4 }}>
        <a
          href="https://github.com/Manz2/time"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="github-link"
        >
          <img
            src="/github.png"
            alt="GitHub"
            style={{ width: '40px', height: '40px' }}
            data-testid="github-image"
          />
        </a>
      </Box>
    </Tooltip>
  );
};
