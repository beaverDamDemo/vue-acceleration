var topspeedMin;
var topspeedMax;
var distance;
var executionTime;
var step_count;
var maxgealength;
var power;
var weight;
var speed;
var cx;
var rolling_resistance;
var maxg;
var maxgearlength;
var speedGain;
var calculate_interval_ms;
var acceleration;
var maxrpm;
var tor = [];
var currentRpm;
var c, b, interval;
var i;

function compute()
{
    //ok initial speed že imamo
    var _topspeedMin = topspeedMin;
    distance = 0;
    executionTime = 0.0;
    step_count = 0;
    console.log("zdaj laufam i: " + i);
    maxgearlength = topspeedMin + (topspeedMax - topspeedMin) * (i / 20.0);
    //po vsaki simulaciji resetira vrednosti na prvotno vrednost iz textboxov
    onegearSim();
}

function onegearSim()
{
    // sw.Write("tralal");
    if ((executionTime < 200) && (speed < 5.0))//pozor ker speed je v m/s
    {
        speedGain = maxg * 0.9;//wheelspin na začetku pospeševanja, prve dve desetinke
    }

    //while (speedGain > 0.0005)//tle not dej speedgain da računa dokler reč še pospešuje
    while (distance < 1609)
    {
        if (speed > 27.7 && b == false)
        {
            //console.log("0-100 time: " + executionTime + "    speed  " + speed * 3.6);
            // sw.WriteLine("0-100 time: " + executionTime + "    speed  " + speed * 3.6);
            b = true;
        }

        if (c == false && distance >= 1000.0)
        {
            //console.log("1KM  Exc. time: {0:F1}", Math.Round(executionTime / 1000, 1));
            //console.log("s  speed: " + Math.Round(speed * 3.6, 2) + "km/h  distance:" + Math.Round(distance, 0) + " m   " + "power:" + power);
            //  sw.Write("1KM  Exc. time: {0:F1}", Math.Round(executionTime / 1000, 2));
            // sw.WriteLine("s  speed: " + Math.Round(speed * 3.6, 2) + "km/h  distance:" + Math.Round(distance, 0) + " m   " + "power:" + power);
            //   sw.WriteLine("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1) + "   rpm:" + currentRpm);
            calculate_interval_ms = calculate_interval_ms * 5;//ponovno na prejšnjo vrednost
            c = true;
        }

        if ((1569.0 < distance) && (distance < 1709.0) && (interval == false))//to pazi kako postaviš
        {
            calculate_interval_ms = calculate_interval_ms / 5;//povečana natančnost da dobimo čas na 1000m DEFAULT 5
            interval = true;
        }

        if (distance > 1560)//to sem dodal zdaj
        {
            //console.log("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1) + "   rpm:" + currentRpm);
            //console.log("s  speed: " + Math.Round(speed * 3.6, 2) + "km/h  distance:" + Math.Round(distance, 0) + " m   " + "power:" + power);
        }

        step_count++;
        executionTime = executionTime + calculate_interval_ms;
        power = calculatePower(speed);
        acceleration = Physics.acceleration_calc(speed, power, weight, cx, rolling_resistance, maxg);
        speedGain = acceleration * calculate_interval_ms;
        speed = speed + speedGain;
        distance = distance + (speed + speedGain / 2) * calculate_interval_ms / 1000;
        //calculateForces();
        //calculateNewData();
        outputData();//ZAČASNO KOMENITRANO

    }
    // sw.Close();
    //  sw.Dispose();
    //  System.Diagnostics.Process.Start(desktoppath + @"\accelerationOutput.txt");
   //console.log("gear length: " +Maxgealength * 3.6 + "   time: " + executionTime);//samo za test.
    console.log("-----------------------------------------------------------------------------------------------------");
    console.log("gearlength: "+Maxgealength+" Time: " + executionTime + "  speed: " + speed * 3.6 + "   power:  " + power + "   rpm: " + currentRpm);
    console.log("Max rpm: " + maxrpm);
    //Environment.Exit(1);//to če furam multiple times simulacijo em sm zakomentiral
}

var calculatePower = function(speed)
{
    if (executionTime < 500)
    {
        return 100.0;
    }
    else
    {
        //OKEJ to je narejeno za singlegear
        currentRpm = Math.Round(speed / maxgearlength * maxrpm);
        //zdaj treba izračuant current power iz tabele tor[]
        var ena_celica = maxrpm / (tor.Length - 2);
        var visek_rpm = currentRpm % ena_celica;
        var celica = (currentRpm / ena_celica);
        //console.log("CELICA -------------" + celica+"    rpm:"+currentRpm);

        if (celica == tor.Length - 2)
        {
            //var currentTorque = tor[celica];
            //tle bi moral returnat same as before? neee ohranit hitrost mora, če ohrani moč bo nadaljeval pospeševanje
            return 0;
        }
        else
        {
            var currentTorque = tor[celica] + (tor[celica + 1] - tor[celica]) * (visek_rpm / ena_celica);
            // sw.WriteLine("rpm: " + currentRpm + "       torque: " + Math.Round(currentTorque, 0) + "lb-ft");
            currentTorque = currentTorque;//preveri če prav konvertira v nm
            var rezultat = currentTorque * currentRpm / 9549

            return rezultat;
        }
    }
}
function outputData()
{
    //sw.WriteLine("tralaala outputdata");
 //var netforce = 0;
    if (b == false)
    {
        //WriteLine("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m   ");
        //        sw.WriteLine("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1)+"   rpm:"+currentRpm);
        console.log("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1) + "   rpm:" + currentRpm);
    }
    else
    {
        if (step_count % 10 == 0)
        {
            console.log("Exc. time: {0:F1}", Math.Round(executionTime / 1000, 1));
            //  sw.Write("Exc. time: {0:F1}", Math.Round(executionTime / 1000, 1));
            //    sw.WriteLine("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1) + "   rpm:" + currentRpm);
            console.log("Exc. time: " + Math.Round(executionTime / 1000, 2) + "s  speed: " + Math.Round(speed * 3.6, 2) + "km/h    speedgain:" + Math.Round(speedGain, 2) + "    distance:" + Math.Round(distance, 0) + " m    power:" + Math.Round(power, 1) + "   rpm:" + currentRpm);
        }
    }
}