import { getUserProfile } from "../services/userService.js";

export const myProfile = async (req, res) => {
  try {
    const userId = req.user.id;
   const loggedUser = await getUserProfile(userId);

    return res.status(200).json({
      success: true,
      data: loggedUser
    })

  } catch (error) {
    console.error("Create Service Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
};
