type IconButtonProps = {
    defaultIcon: string;
    hoverIcon: string;
    activeIcon: string;
    label: string;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
};

function IconButton({
    defaultIcon,
    hoverIcon,
    activeIcon,
    label,
    onClick,
    type = "button",
    disabled = false,
}: IconButtonProps) {
    return (
        <button
            className="retro-icon-button"
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
        >
            <img
                className="retro-icon-button__image retro-icon-button__image--default"
                src={defaultIcon}
                alt=""
            />

            <img
                className="retro-icon-button__image retro-icon-button__image--hover"
                src={hoverIcon}
                alt=""
            />

            <img
                className="retro-icon-button__image retro-icon-button__image--active"
                src={activeIcon}
                alt=""
            />
        </button>
    );
}

export default IconButton;