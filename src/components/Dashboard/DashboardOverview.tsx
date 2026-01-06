import { Box, Card, CardContent, Typography, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { cards } from '../../utils/constants';
import type { JSX } from 'react/jsx-runtime';

const iconMap: { [key: number]: JSX.Element } = {
  1: <PeopleIcon sx={{ fontSize: 40 }} />,
  2: <CheckCircleIcon sx={{ fontSize: 40 }} />,
  3: <CancelIcon sx={{ fontSize: 40 }} />,
  4: <TrendingUpIcon sx={{ fontSize: 40 }} />,
};

const colorMap: { [key: number]: string } = {
  1: 'primary.main',
  2: 'success.main',
  3: 'error.main',
  4: 'info.main',
};

const DashboardOverview = () => {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor your employee statistics at a glance
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            elevation={0}
            sx={{
              height: '100%',
              transition: 'all 0.3s ease',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                boxShadow: 3,
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: `${colorMap[card.id]}15`,
                    color: colorMap[card.id],
                  }}
                >
                  {iconMap[card.id]}
                </Box>
              </Box>

              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ mb: 0.5, color: 'text.primary' }}
              >
                {card.value}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                {card.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardOverview;
