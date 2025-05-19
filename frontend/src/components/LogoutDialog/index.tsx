import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', color: '#333' }}>
        Xác nhận đăng xuất
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ textAlign: 'center' }}>
          Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: '16px' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={isLoading}
          sx={{
            color: '#666',
            borderColor: '#666',
            '&:hover': {
              borderColor: '#333',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          Không
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isLoading}
          sx={{
            backgroundColor: 'orange',
            '&:hover': {
              backgroundColor: '#ff8c00',
            },
            minWidth: '80px',
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Có'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
