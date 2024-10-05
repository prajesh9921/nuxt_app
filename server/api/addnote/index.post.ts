import Group from "../models/groupSchema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const updatedUser = await Group.findByIdAndUpdate(
      body.id,
      { $push: { notes: body.note } }, // Push the new note into the note array
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedUser) {
      return {
        statusCode: 400,
        message: "User not found",
      };
    }

    return {
      statusCode: 200,
      message: "Note added successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Server error" + error,
    };
  }
});
