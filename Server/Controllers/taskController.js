import Task from "../Modules/taskModule.js";

export const addTaskController = async (req, res) => {
  try {
    const { title, description, category  , status} = req.body;
    if (!title || !description || !category || !status) {
      return res.status(400).json({
        message: "All Filed is required!",
        success: false,
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }
    
    console.log(req.user._id);
    const task = await Task.create({
      title,
      description,
      category,
      status,
      user: req.user._id,
    });
    console.log(title , description , category , status);
    
    console.log("Task" , task);

    // if (!task) {
    //   return res.status(400).json({
    //     message: "Something went Wrong!",
    //     success: false,
    //   });
    // }

    return res.status(201).json({
      message: "Task Add SuccessFully",
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const fetchAllTaskController = async (req, res) => {
  try {
    const task = await Task.find({ user: req.user._id });
    return res.status(201).json({
      message: "Fetch Task SuccessFully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const task = await Task.findByIdAndDelete({
      _id : id,
      user: req.user._id,
    });

    console.log("Task" , task)
    if (!task) {
      return res.status(404).json({
        message: "Task not Found!",
        success: true,
      });
    }

    return res.status(201).json({
      message: "Task delete SuccessFully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const editTaskController = async (req, res) => {
  const { id } = req.params;
  // console.log(id); 
  
  try {
    const task = await Task.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not Found",
        success: false,
      });
    }

    const { title, description, category, status } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    if (category) task.category = category;
    if (status) task.status = status;
    
    await task.save();
    console.log(title , description , category , status);

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
