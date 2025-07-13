import Avatar from "@mui/material/Avatar";
import useDarkMode from "@/hooks/useDarkMode.ts";

interface AccountAvatarProps {
    avatarUrl?: string
    nickname: string;
    uid: string;
    size?: "small" | "medium" | "large";
}

function getInitials(nickname: string): string {
    const words = nickname.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0][0]?.toUpperCase() ?? "";
    }
    return (words[0][0] + words[1][0]).toUpperCase();
}

type ColorPair = {
    light: string;
    dark: string;
}

function stringToColor(str: string): ColorPair {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    // Chroma and lightness values can be tuned
    const chroma = 0.16;

    return {light: `oklch(0.8 ${chroma} ${hue})`, dark: `oklch(0.65 ${chroma} ${hue})` };
}

function AccountAvatar({ avatarUrl, nickname, size }: AccountAvatarProps) {
    const isDark = useDarkMode().theme === "dark";
    const width = size === "small" ? 24 : size === "medium" ? 32 : 40;
    const height = size === "small" ? 24 : size === "medium" ? 32 : 40;
    const fontSize = width / 2;

    if (avatarUrl) {
        return <Avatar src={avatarUrl} alt={nickname} sx={{width, height, fontSize}}/>;
    }

    const { light, dark } = stringToColor(nickname);
    console.log("Avatar color:", { light, dark });

    return (
        <Avatar alt={nickname} sx={{backgroundColor: isDark ? dark : light, width, height, fontSize}}>
            {getInitials(nickname)}
        </Avatar>
    )
}

export default AccountAvatar;