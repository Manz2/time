import { Box } from '@mui/material';
import { GitHub } from './Github.tsx';

function Clock() {

  return (
    <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <GitHub />
    </Box>
  );
}

export default Clock;
