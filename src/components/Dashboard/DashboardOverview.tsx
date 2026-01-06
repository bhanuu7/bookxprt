import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import { cards } from '../../utils/constants';

const DashboardOverview = () => {
  return (
    <Box sx={{ border: '2px solid red', height: '100%' }}>
      <Typography variant="h6">Dashboard Overview</Typography>
      <Typography variant="body1">
        Monitor your employee statistics at a glance.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
          mt: 2,
        }}
      >
        {cards.map((card) => (
          <Card>
            <CardActionArea
              sx={{
                height: '100%',
                '&[data-active]': {
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: 'action.selectedHover',
                  },
                },
              }}
            >
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.value}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardOverview;
