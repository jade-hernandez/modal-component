// This file contains the data for the footer component of the website.
// It includes the sections data and the social media data.

import FacebookIcon from "../components/icons/facebook-icon";
import GithubIcon from "../components/icons/github-icon";
import InstagramIcon from "../components/icons/instagram-icon";
import XIcon from "../components/icons/x-icon";
import YoutubeIcon from "../components/icons/youtube-icon";

// Default icons configuration
const ICON_SIZE = 24;
const ICON_COLOR = "#A3A3A3";


// sections data
export const sectionsData = [
  {
    id: 0,
    title: "Features",
    path: "/"
  },
  {
    id: 1,
    title: "Pricing",
    path: "/"
  },
  {
    id: 2,
    title: "About Us",
    path: "/"
  },
  {
    id: 3,
    title: "Contact",
    path: "/"
  }
];

export const defaultIcons = [
  {
    id: "youtube",
    icon: <YoutubeIcon size={ICON_SIZE} color={ICON_COLOR} />,
    label: "Visit Youtube profile",
  },
  {
    id: "instagram",
    icon: <InstagramIcon size={ICON_SIZE} color={ICON_COLOR} />,
    label: "Visit Instagram profile",
  },
  {
    id: "facebook",
    icon: <FacebookIcon size={ICON_SIZE} color={ICON_COLOR} />,
    label: "Visit facebook profile",
  },
  {
    id: "github",
    icon: <GithubIcon size={ICON_SIZE} color={ICON_COLOR} />,
    label: "Visit github profile",
  },
  {
    id: "x",
    icon: <XIcon size={ICON_SIZE} color={ICON_COLOR} />,
    label: "Visit X profile",
  }
];