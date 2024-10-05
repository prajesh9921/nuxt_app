import Group from "../models/groupSchema";

export default defineEventHandler(async (event) => {
  try {
    if (event.node.req.method === "POST") {
      // POST request: Add a new group
      const body = await readBody(event);
      const newGroup = new Group(body);
      if (
        !newGroup.grpName ||
        !newGroup.initialLetters ||
        !newGroup.selectedColor
      ) {
        return {
          statusCode: 400,
          message: "Required groupname, initialLetters, and selectedColor",
        };
      }

      // Save the group to the database
      await newGroup.save();

      return {
        message: "Group added successfully",
        data: newGroup,
      };
    } else {
      // Return an error for methods other than POST
      return {
        statusCode: 405,
        message: "Method Not Allowed",
      };
    }
  } catch (error) {
    console.log("Error in adding group", error);
    return {
      message: "An error occurred adding the group",
      error,
    };
  }
});
