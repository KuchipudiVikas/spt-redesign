import Image from "next/image";
import pressPause from "../../public/assets/masterclass/press-pause.svg";

function NoFakePromisesILS() {
  return (
    <section
      style={{ border: "2px solid #cccccc" }}
      className="my-5 md:my-12 bg-[#f1f3f6] "
    >
      <div className="flex justify-center">
        <div className=" rounded-2xl mx-2 md:mx-0 px-3 md:px-20 py-10 md:py-4">
          <div className="flex justify-evenly flex-col-reverse items-center md:flex-row">
            <div>
              <div className="flex flex-col">
                <div className="flex flex-col justify-evenly mr-4">
                  <br />
                  <h6 className=" text-3xl font-extrabold">
                    No Fake Promises, I Can&apos;t Keep
                  </h6>
                  <h6 className=" text-xl mt-3">
                    I can’t Guarantee results or X amount of Money
                  </h6>
                  <h6 className=" text-xl mt-3">
                    This is a journey, Not get rich Quick
                  </h6>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Image
                src={pressPause.src}
                alt="press-pause ILS"
                width={240}
                height={230}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoFakePromisesILS;
