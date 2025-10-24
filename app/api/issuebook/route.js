import { database } from "@/app/utils/firebaseConfig"
import { get, push, ref, set, update } from "firebase/database"
import { use } from "react";


export async function POST(request) {
    const body = await request.json()
    let userArr, user, issued, mes, success;
    let count =0
    const uref = ref(database, 'Books')
    const userref = ref(database, 'user')


    await get(userref).then((snapshot) => {
        if (snapshot.exists()) {
            user = Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data, }))


        }




    }).catch((err) => {
        console.log('err', err)
        mes = "errr"
    });
    let issueDate = new  Date(body.date)

    await get(uref).then((snapshot) => {
        if (snapshot.exists()) {
            userArr = Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data, }))

            for (const e of userArr) {
                if (e.isbn == body.isbn && e.issued <= e.copies) {
                    issued = e.issued
                    for (const element of user) {
                        console.log('eee', body)
                        if (body.member_id == element.addno) {

                            if (element.cards > 0) {

                                const useRef = ref(database, 'user/' + element.id)
                                const useRefBooks = ref(database, 'Books/' + e.id)
                               // let cards = ['1', '2', '3', '4', '5', '6']
                               let preissue= issueDate;
                            
                                for (const books of element.books) {
                                    
                                    if (books == "") {

                                          update(useRef, {
                                    books: {...element.books,[count] :{issueDate:body.date,isbn:e.isbn,returnDate:new Date(issueDate.setMonth(issueDate.getMonth()+1))}},
                                    cards: element.cards-1
                                })
                              
                                        break
                                    }
                                    count++
                                }



                                update(useRefBooks, {
                                    issued: issued+1,
                                    history:{...e.history,[element.addno]:{
                                        issuedon:issueDate,
                                        isIssued:true,
                                        id:element.addno,
                                        returnedOn:"Not Yet"
                                    }}
                                })
                                console.log('book id', e.id)
                                mes = "Book Issued"
                                success = true

                            } else {
                                mes = "You dont have any Library card left"
                                success = false
                            }

                            break
                        }
                        else {
                            mes = "Enter the correct memberID"
                        }
                    }

                    console.log('first', mes)


                    break
                } else {
                    mes = "Book Not Avaliable"
                    console.log('first', mes)
                }
            }



        } else {
            mes = "No book Exist Add the book to continue"
            success = false
        }
    }).catch((err) => {
        console.log('err', err)
        mes = "errr"
        success = false
    });







    return Response.json({ message: mes, success: success })
}


