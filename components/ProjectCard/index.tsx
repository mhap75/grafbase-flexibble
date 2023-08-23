import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  name,
  avatarUrl,
  userId,
  image,
}) => {
  return (
    <div className="flexCenter drop-shadow-card flex-col rounded-2xl">
      <Link
        href={`/project/${id}`}
        className="flexCenter sizeFull group relative"
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="sizeFull rounded-2xl object-cover"
          alt={title}
        />

        <div className="profile_card-title hidden group-hover:flex">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween mt-3 w-full px-2 text-sm font-semibold">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt={name}
            />
            <p>{name}</p>
          </div>
        </Link>

        <div className="flexCenter flex-wrap gap-x-3 gap-y-1">
          <div className="flexCenter gap-2">
            <Image
              src="/assets/images/heart.svg"
              width={13}
              height={12}
              alt="likes"
            />
            <p className="text-sm">525</p>
          </div>
          <div className="flexCenter gap-2">
            <Image
              src="/assets/images/eye.svg"
              width={13}
              height={12}
              alt="likes"
            />
            <p className="text-sm">5.2K</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
