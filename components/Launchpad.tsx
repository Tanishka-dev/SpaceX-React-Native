import {
   View,
   Text,
   TouchableOpacity,
   Image,
   ImageBackground,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

const Launchpad = ({
   name,
   details,
   status,
   launches,
   onPress,
   images,
   navigation,
}: {
   name: string;
   details: string;
   status: string;
   launches: string[];
   onPress: () => void;
   navigation: any;
   images: {
      large: string[];
   };
}) => {
   const [isReadMore, setisReadMore] = useState(false);

   const Press = () => setisReadMore((prev) => !prev);
   return (
      <View
         style={tw`my-2 flex-col shadow bg-gray-100 border border-gray-200 rounded-xl`}
      >
         <ImageBackground
            style={tw`flex flex-col justify-end w-full h-64 `}
            imageStyle={tw`rounded-t-xl`}
            resizeMode="cover"
            source={{ uri: images.large[0] }}
         ></ImageBackground>
         <View style={tw` `}>
            <View style={tw`bg-sky-600 bg-opacity-30 pb-1 px-2 `}>
               <Text style={tw`text-white font-bold text-xl`}>{name}</Text>

               <TouchableOpacity style={tw`  `} onPress={Press}>
                  {isReadMore ? (
                     <Text style={tw`text-white font-medium text-sm `}>
                        {details}
                     </Text>
                  ) : (
                     <Text style={tw`text-white font-medium text-sm `}>
                        {details.substring(0, 150).concat("... ")}
                        <Text style={tw`text-sky-600 font-medium text-sm`}>
                           Read More
                        </Text>
                     </Text>
                  )}
               </TouchableOpacity>
               <Text style={tw`text-white font-bold text-xl pt-2`}>
                  Status:{" "}
                  <Text style={tw`text-white font-medium text-sm `}>
                     {" "}
                     {status.toUpperCase()}
                  </Text>
               </Text>
            </View>

            <View style={tw`bg-sky-300 rounded-b-xl bg-opacity-30 pb-1 px-2 `}>
               <Text style={tw`text-white font-bold text-xl pt-2`}>
                  Launches:{" "}
               </Text>
               {launches.length !== 0 ? (
                  launches.slice(0, 3).map((launch: any) => (
                     <TouchableOpacity
                        key={launch}
                        onPress={() => {
                           navigation.navigate("Launch", {
                              launchId: launch,
                           });
                        }}
                     >
                        <Text style={tw`text-sky-600`}>
                           {name.concat("- ")}
                           <Text>{launch.substring(19)}</Text>
                        </Text>
                     </TouchableOpacity>
                  ))
               ) : (
                  <Text style={tw`text-sky-600`}>No Launch Available</Text>
               )}
            </View>
         </View>
      </View>
   );
};

export default Launchpad;
