export default function Comment(props) {
  return (
    <div className="p-4 border border-gray-400 rounded-lg">
      <p>{props.comment}</p>
    </div>
  );
}
