import Image from 'next/image'
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {MinusIcon, PlusIcon} from "lucide-react";
import { Button } from "@/components/ui/button"
import {useEffect, useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Head from "next/head";

export default function Home() {
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
    
    const ComputeScore = () => {
        setCompScore((autoScore + teleScore + endScore) - penValue);
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
    }
    
    
    return (
        <>
            <Head>
                <title>FTC Scorer | Team Matrix #20870</title>
                <meta name="description" content="An FTC Centerstage scoring website, that makes your life easier." />
                <meta name="keywords" content="FTC Centerstage, FTC, First Tech Challenge, FTC Matrix, Matrix, Centerstage, FTC Scorer, Centerstage Scorer" />
                <link rel="canonical" href="https://www.scorer.ftcmatrix.com/" />
                            
                {/*Open Graph (OG) tags for social media sharing*/}
                <meta property="og:title" content="FTC Centerstage Scorer | Team Matrix #20870" />
                <meta property="og:description" content="An accurate FTC Centerstage scoring website, that makes your life easier." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.scorer.ftcmatrix.com/" />
                <meta property="og:image" content="https://www.scorer.ftcmatrix.com/LogoNew_TransparentBG_Black.png" />
                
                {/*SEO-specific meta tags*/}
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Team Matrix" />
            </Head>
            <main>
                <div className={"flex flex-col mt-6 mb-12 space-y-5 justify-center items-center"}>
                    <h1 className={"font-black text-xl"}>FTC Centerstage 2023-2024 Scorer</h1>
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
                                    <h1 className={"text-red-500"}>Penalties: <b>{penValue > 0 && "-"}{penValue}</b></h1>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <h1>Your Score: <b>{compScore}</b></h1>
                                <br />
                            </CardFooter>
                        </Card>
                        
                        
                        <AlertDialog>
                            <AlertDialogTrigger className={"w-72 bg-red-500 text-white rounded p-1"}>
                                Clear
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This data is unrecoverable. <b className={"text-red-600 font-bold"}>There is no undo-ing this.</b>
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
                                    <AccordionTrigger>Autonomous</AccordionTrigger>
                                    <AccordionContent>
                                        <div className={"flex flex-col space-y-2"}>
                                            {/*Robot Parked*/}
                                            <div className="items-top flex space-x-2">
                                                <Checkbox id="park" checked={park} onClick={() => {setPark(!park)}}/>
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
                                                
                                                <Select value={ppData} onValueChange={e => {setPpData(e)}}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="noprop">Purple Pixel</SelectItem>
                                                        <SelectItem value="prop">Purple Pixel + Team Prop</SelectItem>
                                                        <SelectItem value="nada">No Purple Pixel</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            
                                            {/*Backdrop Match*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label>Backdrop Pixel Indication</Label>
                                                
                                                <Select value={bdMatch} onValueChange={e => {setBdMatch(e)}}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="bdPixSpike">Backdrop Pixel with Spike Mark</SelectItem>
                                                        <SelectItem value="bdPixTeamProp">Backdrop Pixel with Team Prop</SelectItem>
                                                        <SelectItem value="nada">No Match</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            
                                            {/*Backstage Pixels*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="bs-auto">Backstage Pixels</Label>
                                                
                                                <div className={"flex flex-row space-x-1.5"}>
                                                    <Button onClick={() => {bsAuto > 0 && setBsAuto(bsAuto - 1);}}>
                                                        <MinusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                    <Input id="bs-auto" type="number" value={bsAuto} defaultValue={0} min={0} />
                                                    <Button onClick={() => {setBsAuto(bsAuto + 1);}}>
                                                        <PlusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/*Backdrop Pixels*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="bd-auto">Backdrop Pixels</Label>
                                                
                                                <div className={"flex flex-row space-x-1.5"}>
                                                    <Button onClick={() => {bdAuto > 0 && setBdAuto(bdAuto - 1);}}>
                                                        <MinusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                    <Input id="bd-auto" type="number" value={bdAuto} defaultValue={0} min={0} />
                                                    <Button onClick={() => {setBdAuto(bdAuto + 1);}}>
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
                                                    <Button onClick={() => {bsTele > 0 && setBsTele(bsTele - 1);}}>
                                                        <MinusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                    <Input id="bs-auto" type="number" value={bsTele} defaultValue={0} min={0} />
                                                    <Button onClick={() => {setBsTele(bsTele + 1);}}>
                                                        <PlusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/*Backdrop Pixels*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="bd-tele">Backdrop Pixels</Label>
                                                
                                                <div className={"flex flex-row space-x-1.5"}>
                                                    <Button onClick={() => {bdTele > 0 && setBdTele(bdTele - 1);}}>
                                                        <MinusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                    <Input id="bd-tele" type="number" value={bdTele} defaultValue={0} min={0} />
                                                    <Button onClick={() => {setBdTele(bdTele + 1);}}>
                                                        <PlusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/*Mosaic*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="mosaic-tele">Mosaic Count</Label>
                                                
                                                <div className={"flex flex-row space-x-1.5"}>
                                                    <Button onClick={() => {mosaicTele > 0 && setMosaicTele(mosaicTele - 1);}}>
                                                        <MinusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                    <Input id="mosaic-tele" type="number" value={mosaicTele} defaultValue={0} min={0} />
                                                    <Button onClick={() => {setMosaicTele(mosaicTele + 1);}}>
                                                        <PlusIcon className={"w-4 h-4"} />
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/*Set Lines*/}
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label>Set Line Crossed</Label>
                                                
                                                <Select value={setLineTele} onValueChange={e => {setSetLineTele(e)}}>
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
                                                <Button onClick={() => {bsEnd > 0 && setBsEnd(bsEnd - 1);}}>
                                                    <MinusIcon className={"w-4 h-4"} />
                                                </Button>
                                                <Input id="bs-end" type="number" value={bsEnd} defaultValue={0} min={0} />
                                                <Button onClick={() => {setBsEnd(bsEnd + 1);}}>
                                                    <PlusIcon className={"w-4 h-4"} />
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {/*Backdrop Pixels*/}
                                        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                                            <Label htmlFor="bd-end">Backdrop Pixels</Label>
                                            
                                            <div className={"flex flex-row space-x-1.5"}>
                                                <Button onClick={() => {bdEnd > 0 && setBdEnd(bdEnd - 1);}}>
                                                    <MinusIcon className={"w-4 h-4"} />
                                                </Button>
                                                <Input id="bd-end" type="number" value={bdEnd} defaultValue={0} min={0} />
                                                <Button onClick={() => {setBdEnd(bdEnd + 1);}}>
                                                    <PlusIcon className={"w-4 h-4"} />
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {/*Drone Landing*/}
                                        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                                            <Label>Drone Landing Zone</Label>
                                            
                                            <Select value={droneEnd} onValueChange={e => {setDroneEnd(e)}}>
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
                                            
                                            <Select value={finalStatusEnd} onValueChange={e => {setFinalStatusEnd(e)}}>
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
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="minp">Minor Penalties</Label>
                                            
                                            <div className={"flex flex-row space-x-1.5"}>
                                                <Button onClick={() => {minorPenalties > 0 && setMinorPenalties(minorPenalties - 1);}}>
                                                    <MinusIcon className={"w-4 h-4"} />
                                                </Button>
                                                <Input id="minp" type="number" value={minorPenalties} defaultValue={0} min={0} />
                                                <Button onClick={() => {setMinorPenalties(minorPenalties + 1);}}>
                                                    <PlusIcon className={"w-4 h-4"} />
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {/*Major Penalties*/}
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="majp">Major Penalties</Label>
                                            
                                            <div className={"flex flex-row space-x-1.5"}>
                                                <Button onClick={() => {majorPenalties > 0 && setMajorPenalties(majorPenalties - 1);}}>
                                                    <MinusIcon className={"w-4 h-4"} />
                                                </Button>
                                                <Input id="majp" type="number" value={majorPenalties} defaultValue={0} min={0} />
                                                <Button onClick={() => {setMajorPenalties(majorPenalties + 1);}}>
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
                
                <div className={"flex flex-col items-center pb-4"}>
                    <div className={"flex p-2 space-x-8 flex-row justify-center items-center"}>
                        <Image src={"/LogoNew_TransparentBG_Black.png"} width={165 / 2} height={152 / 2} alt={"FTC Team Matrix Logo"} />
                        <Image src={"/centerstage.png"} width={355 / 2} height={147 / 2} alt={"FTC Centerstage Logo"} />
                    </div>
                    
                    <h1 className={"text-center"}>Provided for public use by <a href={"https://ftcmatrix.com"} target={"_blank"} className={" text-blue-500 underline hover:cursor-pointer"}>Team Matrix #20870</a>. Centerstage logo provided by FIRST.</h1>
                </div>
            </main>
        </>
    )
}
