<!--

    Copyright (c) 2012 Planet Telex Inc. all rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
﻿<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
    <xsl:output method="html" version="5" indent="yes" />
    <xsl:template match="/">
        <xsl:text disable-output-escaping="yes">&lt;!--</xsl:text>
        <xsl:value-of select="Documentation/License" />
        <xsl:text disable-output-escaping="yes">--&gt;</xsl:text>
        <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
        <html>
        <head>

        </head>
        <body>
            <div id="jQueryDocumentation">
                <div id="Example">
                    <xsl:value-of select="Documentation/Example" disable-output-escaping="yes" />
                </div>
                <div id="API">
                    <div id="Overview">
                        <xsl:value-of select="Documentation/Overview" disable-output-escaping="yes" />
                    </div>
                    <div id="Options">
                        <xsl:for-each select="//Section">
                            <h3><xsl:value-of select="@Name" /></h3>
                            <xsl:for-each select="Option">
                                <div>
                                    <h5><xsl:value-of select="@Name" /></h5>
                                    <strong><xsl:value-of select="@Type" /></strong>
                                    <span><xsl:value-of select="@Default" /></span>
                                </div>
                                <p><xsl:value-of select="Desc" /></p>
                                <div class="example">
                                    <xsl:value-of select="Example" disable-output-escaping="yes" />
                                </div>
                            </xsl:for-each>
                        </xsl:for-each>
                    </div>
                    <div id="Events">
                        <xsl:for-each select="Documentation/Events/Event">
                            <h5><xsl:value-of select="@Name" /></h5>
                            <p><xsl:value-of select="Desc" /></p>
                            <div class="example">
                                <xsl:value-of select="Example" disable-output-escaping="yes" /> 
                            </div>
                        </xsl:for-each>
                    </div>
                    <div id="Methods">
                        <xsl:for-each select="Documentation/Methods/Method">
                            <h5><xsl:value-of select="@Name" /></h5>
                            <strong><xsl:value-of select="Sig" /></strong>
                            <p><xsl:value-of select="Desc" /></p>
                            <div class="example">
                                <xsl:value-of select="Example" disable-output-escaping="yes" />
                            </div>
                        </xsl:for-each>
                    </div>
                </div>
            </div>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
