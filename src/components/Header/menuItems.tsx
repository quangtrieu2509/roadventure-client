// import './index.style.scss';
import Label from './Label';
import { ROUTES } from '../../constants';

export const featureItems = [
  {
    name: 'Explore',
    items: [
      {
        key: '1',
        label: (
          <Label
            url={ROUTES.PRODUCT_SIGMA_DRM}
            title="Extraordinary Places"
          />
        ),
      },
      {
        key: '2',
        label: (
          <Label
            url={ROUTES.PRODUCT_SIGMA_TRANSCODER}
            title="Travel Blogs"
          />
        ),
      },
      {
        key: '3',
        label: (
          <Label
            url={ROUTES.PRODUCT_SIGMA_PACKAGE}
            title="Travel Tips"
          />
        ),
      },
      {
        key: '4',
        label: (
          <Label
            url={ROUTES.PRODUCT_SIGMA_LIVESTREAMING}
            title="Adventure Stories"
          />
        ),
      }
    ],
    route: 'explore',
  },
  {
    name: 'Community',
    items: [
      {
        key: '1',
        label: (
          <Label
            url={ROUTES.SERVICE}
            title="New Feeds"
          />
        ),
      },
      {
        key: '2',
        label: (
          <Label
            url={ROUTES.SERVICE}
            title="Write a review"
          />
        ),
      },
      {
        key: '3',
        label: (
          <Label
            url={ROUTES.SERVICE}
            title="Add a place (*)"
          />
        ),
      }
    ],
    route: 'Community',
  },
  {
    name: 'Plan a trip',
    items: [],
    route: 'trips',
  },
  {
    name: 'More',
    items: [],
    route: 'more',
  },
];

export const userItems = {
  name: 'User',
  items: [
    {
      key: '1',
      label: (
        <Label
          url={ROUTES.PRODUCT_SIGMA_DRM}
          title="Notifications"
        />
      ),
    },
    {
      key: '2',
      label: (
        <Label
          url={ROUTES.PRODUCT_SIGMA_DRM}
          title="Profile"
        />
      ),
    },
    {
      key: '3',
      label: (
        <Label
          url={ROUTES.PRODUCT_SIGMA_DRM}
          title="Settings"
        />
      ),
    },
    {
      key: '4',
      label: (
        <Label
          url={ROUTES.HOME}
          title="Sign out"
          event={
            () => {
              console.log("logout")
              localStorage.removeItem('token')
            }
          }
        />
      ),
    },
  ]
};
