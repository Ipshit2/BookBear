import prisma from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const getUserIdFromToken = (req) => {
  const token = req.cookies.token;
  if (!token) throw new Error("No token provided.");
  
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  return decoded.userId;
}


export const createUser = async (req, res) =>{
    const { username, email, password } = req.body;
    try {
        const findUser = await prisma.user.findUnique({
            where: {
              email: email,
            },
            });
        
            if (findUser) {
                return res.json({
                status: 400,
                message: "Email Already Taken . please another email.",
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await prisma.user.create({
                data: {
                  username: username,
                  email: email,
                  password: hashedPassword,
                },
              });
            
              return res.json({ 
                status: 200, 
                data: newUser, 
                message: "User created." });
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong"
        })
    }
 };

 export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
  
      if (!user) {
        return res.status(400).json({
          status: 400,
          message: "Invalid email or password.",
        });
      }
  

      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({
          status: 400,
          message: "Invalid email or password.",
        });
      }
  
      const token = jwt.sign(
        { userId: user.id, email: user.email },  
        process.env.TOKEN_SECRET,  
        { expiresIn: "1h" }  
      );
  
      res.cookie("token", token, {
        httpOnly: true, 
        secure:process.env.NODE_ENV === "production",  // USE ENV FILE
        sameSite: "Lax",  
        maxAge: 3600000,  // 1 hR
      });
  
      
      return res.json({
        status: 200,
        data: { id: user.id, username: user.username, email: user.email },
        message: "Login successful.",
        token: token
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal Error. Please try again later.",
      });
    }
  };
export const logoutUser = async (req, res) => {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        expires: new Date(0),
      });
  
      return res.json({
        status: 200,
        message: "Logout successful. Token has been cleared.",
      });
    } catch (error) {
      console.error("Error during logout:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error. Please try again later.",
      });
    }
  };
  
  export const addBooks = async (req, res) => { 
    const { books } = req.body;  
    
    try {
        const userId = getUserIdFromToken(req);

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        const updatedBooks = books.map(book => ({
          id: book.id,
          status: book.status || "Reading",  
      }))
        const existingBooks = user.books || [];
        const newBooks = [...existingBooks, ...updatedBooks];

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                books: newBooks, 
            },
        });

        return res.json({
            status: 200,
            data: updatedUser,
            message: "Books added successfully.",
        });
    } catch (error) {
        console.error("Error adding books:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Error. Please try again later.",
        });
    }
};

export const getUser = async (req, res) => { 

  try {
      const userId = getUserIdFromToken(req)
      const user = await prisma.user.findUnique({
          where: {
              id: userId,
          },
      });

      if (!user) {
          return res.status(404).json({
              status: 404,
              message: "User not found.",
          });
      }

      return res.json({
          status: 200,
          data: user,
          message: "User information fetched successfully.",
      });
  } catch (error) {
      console.error("Error fetching user information:", error);
      return res.status(500).json({
          status: 500,
          message: "Internal Error. Please try again later.",
      });
  }
};


export const updateStatus = async (req, res) => {
  const { id } = req.params; 
  const { status } = req.body;  
  const userId = req.userId;   

  if (!id || !status) {
    return res.status(400).json({ message: "Book ID and status are required." });
  }

  try {
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const updatedBooks = user.books.map(book =>
      book.id === id ? { ...book, status: status } : book
    );

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { books: updatedBooks },
    });

    return res.status(200).json({
      message: "Book status updated successfully!",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json(
      { message: "Failed to update status." }
    );
  }
}