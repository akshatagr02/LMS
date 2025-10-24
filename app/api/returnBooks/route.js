import { database } from "@/app/utils/firebaseConfig";
import { get, ref, update } from "firebase/database";
import{compareAsc, compareDesc, differenceInDays} from 'date-fns'
export async function POST(request) {
    const body = await request.json();
    let message = "";
    let success = false;
    let fine=0,  dayDef=0;
    const booksRef = ref(database, "Books");
    const usersRef = ref(database, "user");

    try {
        // 1️⃣ Fetch all users
        const userSnapshot = await get(usersRef);
        if (!userSnapshot.exists()) {
            return Response.json({ message: "No users found", success: false });
        }

        const users = Object.entries(userSnapshot.val()).map(([id, data]) => ({ id, ...data }));

        // 2️⃣ Find user with matching member_id (addno)
        const user = users.find((u) => u.addno == body.member_id);
        if (!user) {
            return Response.json({ message: "Invalid Member ID", success: false });
        }

        // 3️⃣ Find the book object inside user.books by ISBN
        const bookIndex = user.books.findIndex((b) => b?.isbn === body.isbn);
        if (bookIndex === -1) {
            return Response.json({ message: "User did not issue this book", success: false });
        }

        // 4️⃣ Fetch all books
        const bookSnapshot = await get(booksRef);
        if (!bookSnapshot.exists()) {
            return Response.json({ message: "No books found", success: false });
        }

        const books = Object.entries(bookSnapshot.val()).map(([id, data]) => ({ id, ...data }));

        // 5️⃣ Find the book in Books collection
        const book = books.find((b) => b.isbn == body.isbn);
        if (!book) {
            return Response.json({ message: "Book not found", success: false });
        }

        // 6️⃣ Update user's book list: free the slot
        const userRef = ref(database, `user/${user.id}`);
        let returnDate = user.books[bookIndex].returnDate
        console.log('returnDate', returnDate)
        user.books[bookIndex] = ""; // mark as returned

        await update(userRef, {
            books: user.books,
            cards: user.cards + 1,
             // return library card
        });


        //Check for fine
       

        if(compareAsc(new Date(),new Date(returnDate)) ==1){
             dayDef = differenceInDays(new Date(),new Date(returnDate))
             console.log('dayDef', dayDef)
           await update(userRef, {
           fine:{...user.fine,[body.isbn]:{

               
               isPaid:false,
               delayedDays:dayDef,
               fine: (dayDef*5),
               id:body.isbn
            }
           }
           
        });     
        fine = dayDef*5
        console.log('Fine ', fine)
        }
        
        // 7️⃣ Update the Books collection
        const bookRef = ref(database, `Books/${book.id}`);
        const updatedHistory = {
            ...(book.history || {}),
            [user.addno]: {
                ...(book.history?.[user.addno] || {}),
                isIssued: false,
                returnedOn: new Date().toISOString(),
            },
        };

        await update(bookRef, {
            issued: book.issued - 1,
            history: updatedHistory,
        });

        message = "Book Returned Successfully";
        success = true;
    } catch (error) {
        console.log("Error:", error);
        message = "Server Error";
        success = false;
    }

    return Response.json({ message, success,fine:fine,dayDef:dayDef });
}
