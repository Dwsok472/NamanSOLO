
import { useParams } from "react-router-dom";
import AlbumBoard from "./AlbumBoard";

const AlbumBoardWithKey = () => {
    const { username } = useParams();
    return <AlbumBoard key={username} />;
};
export default AlbumBoardWithKey 