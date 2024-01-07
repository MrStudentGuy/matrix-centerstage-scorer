import Image from 'next/image'
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {MinusIcon, PlusIcon} from "lucide-react";
import { Button } from "@/components/ui/button"
import React, {useEffect, useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Head from "next/head";
import Script from "next/script";
import {useRouter} from "next/router";
import {ConvertToBool} from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from "framer-motion";
import { useToast } from '@/components/ui/use-toast';
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const { toast } = useToast();
    
    type QueryParamValue = string | number | boolean;
    function updateQuery(queryName: string, queryValue?: QueryParamValue) {
        const query = { ...router.query } as Record<string, string | string[]>;
        
        if (queryValue === null || queryValue === undefined) {
            delete query[queryName];
        } else {
            query[queryName] = queryValue.toString();
        }
        
        router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
    }
    
    
    const {
        score,
        mosaicTeleQ,
        droneEndQ,
        finalStatusEndQ,
        ppDataQ,
        bdMatchQ,
        bsAutoQ,
        bdAutoQ,
        bsTeleQ,
        bdTeleQ,
        bsEndQ,
        bdEndQ,
        parkQ,
        setLineTeleQ,
        minorPenaltiesQ,
        majorPenaltiesQ,
        penValueQ,
        } = router.query;
    
    const [compScore, setCompScore] = useState<number>(0);
    const [autoScore, setAutoScore] = useState<number>(0);
    const [teleScore, setTeleScore] = useState<number>(0);
    const [endScore, setEndScore] = useState<number>(0);
    
    const [mosaicTele, setMosaicTele] = useState<number>(0);
    
    const [setLineTele, setSetLineTele] = useState<string>("nada")
    
    const [droneEnd, setDroneEnd] = useState<string>("nada")
    
    const [finalStatusEnd, setFinalStatusEnd] = useState<string>("nada")
    
    const [ppData, setPpData] = useState<string>("nada");
    const [bdMatch, setBdMatch] = useState<string>("nada");
    
    const [bsAuto, setBsAuto] = useState<number>(0);
    const [bdAuto, setBdAuto] = useState<number>(0);
    
    const [bsTele, setBsTele] = useState<number>(0);
    const [bdTele, setBdTele] = useState<number>(0);
    
    const [bsEnd, setBsEnd] = useState<number>(0);
    const [bdEnd, setBdEnd] = useState<number>(0);
    
    const [park, setPark] = useState<boolean>(false);
    
    const [minorPenalties, setMinorPenalties] = useState<number>(0);
    const [majorPenalties, setMajorPenalties] = useState<number>(0);
    
    // the value of penalties
    const [penValue, setPenValue] = useState<number>(0);
    
    const [isPWA, setIsPWA] = useState<boolean>(false);
    
    const ComputeScore = () => {
        setCompScore((autoScore + teleScore + endScore) - (penValue));
    }
    
    const ComputeAutoScore = () => {
        let score = (bsAuto * 3) + (bdAuto * 5);
        park ? score += 5 : score += 0;
        
        switch (ppData) {
            case "noprop":
                score += 10;
                break;
            case "prop":
                score += 20;
                break;
            case "nada":
                score += 0;
                break;
            default:
                score += 0;
        }
        
        switch (bdMatch) {
            case "bdPixSpike":
                score += 10;
                break;
            case "bdPixTeamProp":
                score += 20;
                break;
            case "nada":
                score += 0;
                break;
            default:
                score += 0;
        }
        
        setAutoScore(score);
    }
    const ComputeTeleScore = () => {
        let score = bsTele + (bdTele * 3);
        
        score += (mosaicTele * 10)
        
        switch (setLineTele) {
            case "1":
                score += 10;
                break;
            case "2":
                score += 20;
                break;
            case "3":
                score += 30;
                break;
            case "nada":
                score += 0;
                break;
            default:
                score += 0;
                break;
        }
        
        setTeleScore(score);
    }
    
    const ComputeEndGameScore = () => {
        let score = bsEnd + (bdEnd * 3);
        
        switch (droneEnd) {
            case "1":
                score += 30;
                break;
            case "2":
                score += 20;
                break;
            case "3":
                score += 10;
                break;
            default:
                score += 0;
                break;
        }
        
        switch (finalStatusEnd) {
            case "park":
                score += 5;
                break;
            case "sus":
                score += 20;
                break;
            default:
                score += 0;
                break;
        }
        
        setEndScore(score);
    }
    
    const ComputePenalties = () => {
        let score = (minorPenalties * 10) + (majorPenalties * 30);
        setPenValue(score);
    }
    
    useEffect(() => {
        setIsPWA(window.matchMedia('(display-mode: standalone)').matches);
    }, [])
    
    useEffect(() => {
        setCompScore(parseInt(score as string) || 0);
        setPenValue(parseInt(penValueQ as string) || 0);
        setPark(ConvertToBool(parkQ as string) || false);
        setPpData(ppDataQ as string || "nada");
        setBdMatch(bdMatchQ as string || "nada");
        setBsAuto(parseInt(bsAutoQ as string) || 0);
        setBdAuto(parseInt(bdAutoQ as string) || 0);
        setBsTele(parseInt(bsTeleQ as string) || 0);
        setBdTele(parseInt(bdTeleQ as string) || 0);
        setBsEnd(parseInt(bsEndQ as string) || 0);
        setBdEnd(parseInt(bdEndQ as string) || 0);
        setMosaicTele(parseInt(mosaicTeleQ as string) || 0);
        setSetLineTele(setLineTeleQ as string || "nada");
        setDroneEnd(droneEndQ as string || "nada");
        setFinalStatusEnd(finalStatusEndQ as string || "nada");
        setMinorPenalties(parseInt(minorPenaltiesQ as string) || 0);
        setMajorPenalties(parseInt(majorPenaltiesQ as string) || 0);
    }, [router.isReady])
    
    useEffect(() => {
        ComputeAutoScore();
    }, [bsAuto, bdAuto, park, ppData, bdMatch]);
    
    useEffect(() => {
        ComputeTeleScore();
    }, [bsTele, bdTele, mosaicTele, setLineTele]);
    
    useEffect(() => {
        ComputeEndGameScore();
    }, [bsEnd, bdEnd, droneEnd, finalStatusEnd]);
    
    useEffect(() => {
        ComputeScore();
    }, [autoScore, teleScore, endScore, penValue]);
    
    useEffect(() => {
        ComputePenalties();
    }, [minorPenalties, majorPenalties])
    
    const Clear = () => {
        setBsAuto(0);
        setBdAuto(0);
        setPark(false);
        setPpData("nada");
        setBdMatch("nada");
        setBsTele(0);
        setBdTele(0);
        setBsEnd(0);
        setBdEnd(0);
        setMosaicTele(0);
        setSetLineTele("nada");
        setDroneEnd("nada");
        setFinalStatusEnd("nada");
        setAutoScore(0);
        setTeleScore(0);
        setEndScore(0);
        setPenValue(0);
        setMinorPenalties(0);
        setMajorPenalties(0);
        
        const q = { ...router.query };
        delete q.score;
        delete q.autoScoreQ;
        delete q.teleScoreQ;
        delete q.endScoreQ;
        delete q.mosaicTeleQ;
        delete q.droneEndQ;
        delete q.finalStatusEndQ;
        delete q.ppDataQ;
        delete q.bdMatchQ;
        delete q.bsAutoQ;
        delete q.bdAutoQ;
        delete q.bsTeleQ;
        delete q.bdTeleQ;
        delete q.bsEndQ;
        delete q.bdEndQ;
        delete q.parkQ;
        delete q.setLineTeleQ;
        delete q.minorPenaltiesQ;
        delete q.majorPenaltiesQ;
        delete q.penValueQ;
        router.push({ pathname: router.pathname, query: q });
    }
    
    return (
        <>
            <Script async src={"https://analytics.eu.umami.is/script.js"} data-website-id="099319de-6e6b-4ff7-82b0-91fdfce5310d" />
            <Head>
                <title>FTC Scorer | Team Matrix #20870</title>
                <meta name="description" content="An FTC Centerstage scoring website, that makes your life easier." />
                <meta name="keywords" content="FTC Centerstage, FTC, First Tech Challenge, FTC Matrix, Matrix, Centerstage, FTC Scorer, Centerstage Scorer" />
                <link rel="canonical" href="https://www.scorer.ftcmatrix.com/" />
                            
                {/*Open Graph (OG) tags for social media sharing*/}
                <meta property="og:title" content="FTC Centerstage Scorer | Team Matrix #20870" />
                <meta property="og:description" content="Discover the ultimate FTC Robotics Scorer by Team Matrix, setting new standards for precision and efficiency in the world of competitive robotics. Our cutting-edge solution is designed to empower your team in FIRST Tech Challenge (FTC) competitions like never before. With Team Matrix's FTC Robotics Scorer, you'll experience game-changing accuracy, speed, and reliability. Whether you're aiming for precise mineral placement, optimal stacking, or seamless autonomous routines, our scorer is your winning companion. It's equipped with advanced sensors, intelligent algorithms, and a user-friendly interface that simplifies scoring tasks and strategy planning." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.scorer.ftcmatrix.com/" />
                <meta property="og:image" content="https://www.scorer.ftcmatrix.com/LogoNew_BlackBG.png" />
                
                {/*SEO-specific meta tags*/}
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Team Matrix" />
            </Head>
            <main className={"overflow-x-hidden"}>
                <div className={"flex flex-col mt-6 mb-12 space-y-5 justify-center items-center"}>
                    <h1 className={"font-bold text-xl"}>FTC Centerstage 2023-2024 Scorer</h1>
                    <div className={"flex flex-col space-y-2 justify-center items-center"}>
                        <Card className={"w-72"}>
                            <CardHeader>
                                <CardTitle>Score Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={"text-zinc-500"}>
                                    <h1>Autonomous: <b>{autoScore}</b></h1>
                                    <h1>Tele-Op: <b>{teleScore}</b></h1>
                                    <h1>Endgame: <b>{endScore}</b></h1>
                                    <h1>Pre-Penalty Total: <b>{autoScore + teleScore + endScore}</b></h1>
                                    <div className={"flex flex-row items-center"}>
                                        <h1 className={"text-red-500"}>Penalties: <b>{penValue > 0 && "-"}{penValue}</b></h1>
                                        
                                        {/*<Popover>*/}
                                        {/*    <PopoverTrigger className={"ml-1 flex justify-center items-center"}><InfoIcon className={"w-4 h-4"} /></PopoverTrigger>*/}
                                        {/*    <PopoverContent>Given that this tool is to score one team and not an alliance, the penalties are halved to reflect that.</PopoverContent>*/}
                                        {/*</Popover>*/}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className={"flex flex-row justify-between"}>
                                <h1>Your Score: <b>{compScore}</b></h1>
                                <br />
                            </CardFooter>
                        </Card>
                        
                        {!isPWA && (
                            <Dialog>
                                <DialogTrigger>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scaleX: 0.9 }}
                                        className={"w-72 bg-black text-white p-1 rounded-lg"}>
                                        Install App
                                    </motion.div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Install App</DialogTitle>
                                        <DialogDescription>
                                            <h1>This app is available as a PWA. A Progressive Web App (PWA) is an app built for the web that provides an experience similar to a mobile app. It provides the same functionalities as a website, but with more conveniences such as being on your homescreen, and offline support.</h1>
                                            <br />
                                            <h1>Open the appropriate section to learn how to install this PWA on your browser.</h1>
                                            
                                            <div className={"flex flex-col space-y-2"}>
                                                <Accordion type="single" collapsible>
                                                    {/*Auto*/}
                                                    <AccordionItem value="item-1">
                                                        <AccordionTrigger>Google Chrome (All
                                                            platforms)</AccordionTrigger>
                                                        <AccordionContent>
                                                            <Link className={"text-blue-600 underline font-bold"}
                                                                  target={"_blank"} rel={"noreferrer"}
                                                                  href={"https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DDesktop"}>
                                                                Click here for instructions.
                                                            </Link>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                    {/*Tele-Op*/}
                                                    <AccordionItem value="item-2">
                                                        <AccordionTrigger>Safari (iOS)</AccordionTrigger>
                                                        <AccordionContent>
                                                            <h1 className={"font-bold"}>
                                                                Follow the steps to install a PWA on iOS devices:
                                                            </h1>
                                                            
                                                            <ol className={"list-decimal list-inside"}>
                                                                <li>
                                                                    Tap the Share icon on the bottom toolbar.
                                                                </li>
                                                                
                                                                <li>Select &quot;Add to Home Screen&quot; from the
                                                                    options
                                                                </li>
                                                                
                                                                <li>
                                                                    Confirm the installation by tapping
                                                                    the &quot;Add&quot; button.
                                                                </li>
                                                            
                                                            </ol>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                    {/*End*/}
                                                    <AccordionItem value="item-3">
                                                        <AccordionTrigger>Other</AccordionTrigger>
                                                        <AccordionContent>
                                                            <h1 className={"font-bold"}>If the other sections do not
                                                                apply to you, you can refer
                                                                to <Link className={"text-blue-600 underline"}
                                                                         target={"_blank"} rel={"noreferrer"}
                                                                         href={"https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing#installing_and_uninstalling_pwas"}>this
                                                                    link.</Link></h1>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        )}
                        
                        
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <motion.div
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scaleX: 0.9}}
                                    className={"w-72 bg-red-500 text-white p-1 rounded-lg"}>
                                    Clear
                                </motion.div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This data is unrecoverable. <b className={"text-red-600 font-bold"}>There is no
                                        undo-ing this.</b>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={Clear}>Clear</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    
                    <div className={"flex justify-center items-center"}>
                        <div className="flex flex-col justify-center w-72">
                            <Accordion type="single" collapsible>
                                {/*Auto*/}
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Google Chrome</AccordionTrigger>
                                    <AccordionContent>
                                        <div className={"flex flex-col space-y-2"}>
                                            {/*Robot Parked*/}
                                            <div className="items-top flex space-x-2">
                                                <Checkbox id="park" checked={park} onClick={() => {
                                                    setPark(!park);
                                                    updateQuery("parkQ", !park)
                                                }}/>
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor="park"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Robot Parked
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            {/*Purple Pixel*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label>Purple Pixel</Label>
                                                
                                                <Select value={ppData} onValueChange={e => {setPpData(e); updateQuery("ppDataQ", e)}}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="noprop">Purple Pixel + White Pixel</SelectItem>
                                                        <SelectItem value="prop">Purple Pixel + Team Prop</SelectItem>
                                                        <SelectItem value="nada">No Purple Pixel</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            
                                            {/*Backdrop Match*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label>Backdrop Pixel Indication</Label>
                                                
                                                <Select value={bdMatch} onValueChange={e => {setBdMatch(e); updateQuery("bdMatchQ", e)}}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="bdPixSpike">Backdrop Pixel + White Pixel</SelectItem>
                                                        <SelectItem value="bdPixTeamProp">Backdrop Pixel + Team Prop</SelectItem>
                                                        <SelectItem value="nada">No Match</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            
                                            {/*Backstage Pixels*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="bs-auto">Backstage Pixels</Label>
                                                
                                                <div className={"flex flex-row space-x-1.5"}>
                                                    <Button onClick={() => {bsAuto > 0 && setBsAuto(bsAuto - 1); bsAuto > 0 && updateQuery("bsAutoQ", bsAuto - 1)}}>
                                                        <MinusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                    <Input id="bs-auto" type="number" value={bsAuto} defaultValue={0} min={0} />
                                                    <Button onClick={() => {setBsAuto(bsAuto + 1); updateQuery("bsAutoQ", bsAuto + 1);}}>
                                                        <PlusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/*Backdrop Pixels*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="bd-auto">Backdrop Pixels</Label>
                                                
                                                <div className={"flex flex-row space-x-1.5"}>
                                                    <Button onClick={() => {bdAuto > 0 && setBdAuto(bdAuto - 1); bdAuto > 0 && updateQuery("bdAutoQ", bdAuto - 1)}}>
                                                        <MinusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                    <Input id="bd-auto" type="number" value={bdAuto} defaultValue={0} min={0} />
                                                    <Button onClick={() => {setBdAuto(bdAuto + 1); updateQuery("bdAutoQ", bdAuto + 1)}}>
                                                        <PlusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                {/*Tele-Op*/}
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Tele-Op</AccordionTrigger>
                                    <AccordionContent>
                                        <div className={"flex flex-col space-y-2"}>
                                            {/*Backstage Pixels*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="bs-tele">Backstage Pixels</Label>
                                                
                                                <div className={"flex flex-row space-x-1.5"}>
                                                    <Button onClick={() => {bsTele > 0 && setBsTele(bsTele - 1); bsTele > 0 && updateQuery("bsTeleQ", bsTele - 1)}}>
                                                        <MinusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                    <Input id="bs-auto" type="number" value={bsTele} defaultValue={0} min={0} />
                                                    <Button onClick={() => {setBsTele(bsTele + 1); updateQuery("bsTeleQ", bsTele + 1)}}>
                                                        <PlusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/*Backdrop Pixels*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="bd-tele">Backdrop Pixels</Label>
                                                
                                                <div className={"flex flex-row space-x-1.5"}>
                                                    <Button onClick={() => {bdTele > 0 && setBdTele(bdTele - 1); bdTele > 0 && updateQuery("bdTeleQ", bdTele - 1)}}>
                                                        <MinusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                    <Input id="bd-tele" type="number" value={bdTele} defaultValue={0} min={0} />
                                                    <Button onClick={() => {setBdTele(bdTele + 1); updateQuery("bdTeleQ", bdTele + 1)}}>
                                                        <PlusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/*Mosaic*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="mosaic-tele">Mosaic Count</Label>
                                                
                                                <div className={"flex flex-row space-x-1.5"}>
                                                    <Button onClick={() => {mosaicTele > 0 && setMosaicTele(mosaicTele - 1); mosaicTele > 0 && updateQuery("mosaicTeleQ", mosaicTele - 1)}}>
                                                        <MinusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                    <Input id="mosaic-tele" type="number" value={mosaicTele} defaultValue={0} min={0} />
                                                    <Button onClick={() => {setMosaicTele(mosaicTele + 1); updateQuery("mosaicTeleQ", mosaicTele + 1)}}>
                                                        <PlusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/*Set Lines*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label>Set Line Crossed</Label>
                                                
                                                <Select value={setLineTele} onValueChange={e => {setSetLineTele(e); updateQuery("setLineTeleQ", e)}}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">Set Line 1</SelectItem>
                                                        <SelectItem value="2">Set Line 2</SelectItem>
                                                        <SelectItem value="3">Set Line 3</SelectItem>
                                                        <SelectItem value="nada">No Set Line Crossed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                {/*End*/}
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Endgame</AccordionTrigger>
                                    <AccordionContent>
                                        {/*Backstage Pixels*/}
                                        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                                            <Label htmlFor="bs-end">Backstage Pixels</Label>
                                            
                                            <div className={"flex flex-row space-x-1.5"}>
                                                <Button onClick={() => {bsEnd > 0 && setBsEnd(bsEnd - 1); bsEnd > 0 && updateQuery("bsEndQ", bsEnd - 1)}}>
                                                    <MinusIcon className={"w-4 h-4"} />
                                                </Button>
                                                <Input id="bs-end" type="number" value={bsEnd} defaultValue={0} min={0} />
                                                <Button onClick={() => {setBsEnd(bsEnd + 1); updateQuery("bsEndQ", bsEnd + 1)}}>
                                                    <PlusIcon className={"w-4 h-4"} />
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {/*Backdrop Pixels*/}
                                        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                                            <Label htmlFor="bd-end">Backdrop Pixels</Label>
                                            
                                            <div className={"flex flex-row space-x-1.5"}>
                                                <Button onClick={() => {bdEnd > 0 && setBdEnd(bdEnd - 1); bdEnd > 0 && updateQuery("bdEndQ", bdEnd - 1)}}>
                                                    <MinusIcon className={"w-4 h-4"} />
                                                </Button>
                                                <Input id="bd-end" type="number" value={bdEnd} defaultValue={0} min={0} />
                                                <Button onClick={() => {setBdEnd(bdEnd + 1); updateQuery("bdEndQ", bdEnd + 1)}}>
                                                    <PlusIcon className={"w-4 h-4"} />
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {/*Drone Landing*/}
                                        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                                            <Label>Drone Landing Zone</Label>
                                            
                                            <Select value={droneEnd} onValueChange={e => {setDroneEnd(e); updateQuery("droneEndQ", e)}}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Zone 1</SelectItem>
                                                    <SelectItem value="2">Zone 2</SelectItem>
                                                    <SelectItem value="3">Zone 3</SelectItem>
                                                    <SelectItem value="nada">N/A</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        
                                        {/*Parking/Suspended*/}
                                        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                                            <Label>Robot Parked or Suspended</Label>
                                            
                                            <Select value={finalStatusEnd} onValueChange={e => {setFinalStatusEnd(e); updateQuery("finalStatusEndQ", e);}}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="park">Robot Parked in Backstage</SelectItem>
                                                    <SelectItem value="sus">Robot Suspended on Rigging</SelectItem>
                                                    <SelectItem value="nada">N/A</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                {/*Penalties*/}
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>Penalties</AccordionTrigger>
                                    <AccordionContent>
                                        {/*Minor Penalties*/}
                                        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                                            <Label htmlFor="minp">Minor Penalties</Label>
                                            
                                            <div className={"flex flex-row space-x-1.5"}>
                                                <Button onClick={() => {minorPenalties > 0 && setMinorPenalties(minorPenalties - 1); minorPenalties > 0 && updateQuery("minorPenaltiesQ", minorPenalties - 1)}}>
                                                    <MinusIcon className={"w-4 h-4"} />
                                                </Button>
                                                <Input id="minp" type="number" value={minorPenalties} defaultValue={0} min={0} />
                                                <Button onClick={() => {setMinorPenalties(minorPenalties + 1); updateQuery("minorPenaltiesQ", minorPenalties + 1)}}>
                                                    <PlusIcon className={"w-4 h-4"} />
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {/*Major Penalties*/}
                                        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                                            <Label htmlFor="majp">Major Penalties</Label>
                                            
                                            <div className={"flex flex-row space-x-1.5"}>
                                                <Button onClick={() => {majorPenalties > 0 && setMajorPenalties(majorPenalties - 1); majorPenalties > 0 && updateQuery("majorPenaltiesQ", majorPenalties - 1)}}>
                                                    <MinusIcon className={"w-4 h-4"} />
                                                </Button>
                                                <Input id="majp" type="number" value={majorPenalties} defaultValue={0} min={0} />
                                                <Button onClick={() => {setMajorPenalties(majorPenalties + 1); updateQuery("majorPenaltiesQ", majorPenalties + 1)}}>
                                                    <PlusIcon className={"w-4 h-4"} />
                                                </Button>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
                
                <div className={"flex flex-row items-center w-screen justify-center space-x-1.5"}>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scaleX: 0.9 }}
                    >
                        <a href={"https://www.instagram.com/ftcmatrix"} target={"_blank"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" stroke-width="1.5" viewBox="0 0 24 24" color="#000000"><path stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path><path stroke="#000000" stroke-width="1.5" d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z"></path><path stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m17.5 6.51.01-.011"></path></svg>
                        </a>
                    </motion.div>
                    
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scaleX: 0.9 }}
                    >
                        <a href={"mailto:ftcmatrix2021@gmail.com"} target={"_blank"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" stroke-width="1.5" viewBox="0 0 24 24" color="#000000"><path stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m7 9 5 3.5L17 9"></path><path stroke="#000000" stroke-width="1.5" d="M2 17V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"></path></svg>
                        </a>
                    </motion.div>
                </div>
                
                <div className={"flex flex-col items-center pb-4"}>
                    <div className={"flex p-2 space-x-8 flex-row justify-center items-center"}>
                        <Image src={"/LogoNew_TransparentBG_Black.png"} width={165 / 1.5} height={152 / 1.5} alt={"FTC Team Matrix Logo"} />
                        <Image src={"/centerstage.png"} width={355 / 2} height={147 / 2} alt={"FTC Centerstage Logo"} />
                    </div>
                    
                    <h1 className={"text-center"}>Provided for public use by <a href={"https://ftcmatrix.com"} target={"_blank"} className={" text-blue-500 underline hover:cursor-pointer"}>Team Matrix #20870</a>. Centerstage logo provided by FIRST. <br /> We are not affiliated with and do not represent FIRST, or FIRST Tech Challenge (FTC).</h1>
                </div>
            </main>
        </>
    )
}