import Group from "../models/groupSchema";

export default defineEventHandler(async (event) => {
  try {
    const AllGroups = await Group.find({});
    return {
      data: AllGroups,
    };
  } catch (error) {
    console.log("error in fetching groups", error);
  }
});
