import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showddfrnd, setshowaddfrnd] = useState(false);
  const [friend, setfriend] = useState(initialFriends);
  const [selectedfriend, setselectedfriend] = useState(null);

  function handleshowadd() {
    setshowaddfrnd((show) => !show);
  }

  function handleaddfriend(newfriend) {
    setfriend((friends) => [...friends, newfriend]);
    setshowaddfrnd(false);
  }

  function handleselection(friend) {
    setselectedfriend((cur) => (cur?.id === friend.id ? null : friend));
    handleshowadd(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friend={friend}
          onselection={handleselection}
          selectedfriend={selectedfriend}
        />

        {showddfrnd && <Formaddfriend onaddfriend={handleaddfriend} />}

        <Button onClick={handleshowadd}>
          {showddfrnd ? "close" : "add friend"}
        </Button>
      </div>

      {selectedfriend && <Formsplitbill selectedfriend={selectedfriend} />}
    </div>
  );
}

function FriendList({ friend, onselection, selectedfriend }) {
  return (
    <ul className="friend-list">
      {friend.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onselection={onselection}
          selectedfriend={selectedfriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onselection, selectedfriend }) {
  const isselected = selectedfriend?.id === friend.id;
  return (
    <li className={isselected ? "selected" : " "}>
      <img src={friend.image} alt={friend.name} />
      <h3 className="friend-name">{friend.name}</h3>

      {friend.balance > 0 && (
        <p className="red">
          {" "}
          you owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance < 0 && (
        <p className="green">
          {" "}
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance === 0 && <p> you and {friend.name}are even</p>}

      <Button onClick={() => onselection(friend)}>
        {" "}
        {isselected ? "close" : "select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Formaddfriend({ onaddfriend }) {
  const [name, setname] = useState(" ");
  const [image, setimage] = useState("https://i.pravatar.cc/48 ");

  function handlesubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newfriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onaddfriend(newfriend);

    setname("");
    setimage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handlesubmit}>
      <label>😊Name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />

      <label>😊Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setimage(e.target.value)}
      />
      <Button> add </Button>
    </form>
  );
}

function Formsplitbill({ selectedfriend }) {
  const [bill, setbill] = useState(" ");
  const [paidbyuser, setpaidbyuser] = useState("");
  const paidbyfriend = bill ? bill - paidbyuser : "";
  const [whoispayibng, setwhoispaying] = useState("user");

  function handlesubmit(e) {
    e.preventDefault();

    if (!bill || !paidbyuser) return;
  }

  return (
    <form className="form-split-bill" onSubmit={handlesubmit}>
      <h2> SPLIT A BILL WITH {selectedfriend.name}</h2>
      <label> 😊bill vlaue </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setbill(Number(e.target.value))}
      />
      <label> 😊your expense </label>
      <input
        type="text"
        value={paidbyuser}
        onChange={(e) =>
          setpaidbyuser(
            Number(e.target.value) > bill ? paidbyuser : Number(e.target.value)
          )
        }
      />
      <label> 😊{selectedfriend.name}'s expense</label>
      <input type="text" disabled value={paidbyfriend} />

      <label> 😊who is paying the bill</label>
      <select
        value={whoispayibng}
        onChange={(e) => setwhoispaying(e.target.value)}
      >
        <option value="user"> you </option>
        <option value="friend">{selectedfriend.name}</option>
      </select>
      <Button>split bill</Button>
    </form>
  );
}
