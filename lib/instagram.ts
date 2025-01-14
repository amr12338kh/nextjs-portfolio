import { InstagramStatsProps } from "@/types";
import axios from "axios";

export const getInstagramStats = async (): Promise<InstagramStatsProps> => {
  const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
  const INSTAGRAM_USER_ID = process.env.INSTAGRAM_ACCOUNT_ID;

  try {
    const response = await axios.get(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}?fields=id,followers_count&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );

    return {
      followers: response.data.followers_count,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching Instagram data: ",
        error.response?.data || error.message
      );
    } else {
      console.error("Error fetching Instagram data: ", error);
    }
    return {
      followers: 0,
    };
  }
};
