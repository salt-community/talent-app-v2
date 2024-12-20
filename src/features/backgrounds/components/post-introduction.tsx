import Image from "next/image";

export function PostIntroduction() {
  return (
    <>
      <Image
        src={"/placholder-img.png"}
        alt="Placeholder picture"
        width={400}
        height={400}
        className="object-cover"
      />
      <h1>Title</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis eius voluptatum, saepe soluta vitae ut fuga. Delectus cupiditate, officiis eligendi debitis temporibus maiores, architecto similique magni vitae quam fugit ab!</p>
    </>
  );
}
