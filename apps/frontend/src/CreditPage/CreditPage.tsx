import IconCloud from "./IconCloudComponent.tsx"

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "tailwindcss",
  "vite",
  "vitest",
  "webstorm",
  "mantine",
  "express",
  "prisma",
  "amazonwebservices",
  "postgresql",
  "bruno",
  "docker",
  "git",
  "jira",
  "github",
  "figma",
  "discord",
];

function IconCloudDemo() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  );
}

function CreditPage() {
  return (
    <div>
      <IconCloudDemo />
    </div>
  );
}

export default CreditPage;
