interface Message {
  text: string;
  createdAt: admin.firestore.Timetamp;
  user: {
    name: string;
    _id: string;
    image: string;
  };
}
